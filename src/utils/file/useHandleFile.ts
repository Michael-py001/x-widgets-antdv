/*
 * @Author: Wushili
 * @Date: 2024-04-07
 */
import { isRef, ref, unref } from 'vue'
import { downloadFile as _downloadFile } from './download'
// import { message as AMessage } from 'x-widgets'
import {
    fileTypes,
    imageType,
    videoType,
    pdfType,
    wordType,
    excelType,
    otherType,
} from './fileTypes'

/**
 * @description: 传入url，返回下载地址
 * @param {*} _url
 * @return {*}
 */
export const getFileDownloadUrl = (
    url: string,
    { downloadBaseUrl = '' }: { downloadBaseUrl?: string } = {},
) => {
    if (/^(?:https?:)?\/\//i.test(url) || /^(?:blob|data):/i.test(url)) {
        return url
    }
    if (!downloadBaseUrl) return url
    return `${downloadBaseUrl.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`
}
export interface uploadFileOptions {
    file: any
    fileList: any[]
}

export interface useHandleFileOptions {
    emits?: Function
    btnRef?: any
    downloadBaseUrl?: string
    previewUrlResolver?: (url: string, fileType: string) => string
}
interface fileProps {
    fileKey: string
    url?: string
    fileName?: string
    fileUrl?: string
}
/*
 * @Description:
 * @param options supports upload refs, a base URL for relative file paths, and a preview URL resolver
 * @return:
 */
export function useHandleFile(
    {
        emits = null,
        btnRef = null,
        downloadBaseUrl = '',
        previewUrlResolver,
    } = {} as useHandleFileOptions,
) {
    const isExporting = ref(false)
    // 导出文件，后端需要返回二进制内容
    /***
     * @param {Function} apiFunc 接口函数
     * @param {Object} options 参数
     */
    async function exportFile(
        apiFunc,
        {
            downloadName = '',
            fileType = '',
            params = {},
            onExportSuccess = null,
            onExportError = null,
        } = {},
    ) {
        // 进入导出状态
        isExporting.value = true
        try {
            apiFunc = isRef(apiFunc) ? unref(apiFunc) : apiFunc
            const res = await apiFunc(params) // 接口必须写上返回格式 responseType: 'blob',
            if (res && res.data && !res.data.code) {
                const blob = new Blob([res.data], { type: fileTypes[fileType] })
                const _link = document.createElement('a')
                _link.href = window.URL.createObjectURL(blob)
                const contentDisposition = res.headers['content-disposition']
                let responseFileName = ''
                if (downloadName) {
                    if (contentDisposition) {
                        const contentDispositionArr = contentDisposition.split('.')
                        fileType = contentDispositionArr[contentDispositionArr.length - 1]
                    }
                    _link.download = (downloadName ? downloadName : '') + `.${fileType}`
                } else if (contentDisposition) {
                    const contentDispositionArr = contentDisposition.split('.')
                    fileType = contentDispositionArr[contentDispositionArr.length - 1]
                    const match = contentDisposition.match(/filename=(.+)/)
                    if (match && match[1]) {
                        responseFileName = decodeURIComponent(match[1])
                        _link.download = responseFileName
                    }
                }
                _link.click()
                _link.remove()
                emits && emits('success', res)
                onExportSuccess && onExportSuccess(res)
            } else {
                emits && emits('error', res)
                onExportError && onExportError(res)
                // AMessage.error(res?.message || res?.data?.message || '导出出错！')
            }
            // 取消导出状态
            isExporting.value = false
        } catch (err) {
            isExporting.value = false
            emits && emits('error', err)
            throw Error(err)
        }
    }

    /**
     * 下载文件
     * @param file 文件信息
     * @param name 下载文件名，不填则使用文件名
     * @param delay 延迟下载时间，单位毫秒
     */
    function downloadFile(file: fileProps | string, name?: string, delay = 0) {
        if (typeof file === 'string') {
            window.open(getFileDownloadUrl(file, { downloadBaseUrl }))
        } else if (file.fileKey) {
            _downloadFile(file.fileKey, name, delay)
        }
    }

    const fileList = ref([]),
        isUploading = ref(false) //是否上传中

    // 删除文件
    function deleteFile(file) {
        if (!file.fileKey) return
        const _list = unref(fileList)
        const _index = _list.findIndex(item => item.fileKey === file.fileKey)
        fileList.value.splice(_index, 1)
    }

    // 上传/导入
    function uploadFile({ file, fileList: _fileList } = {} as uploadFileOptions, key) {
        const { emit: btnEmit } = btnRef?.value || {}
        if (file.status === 'done') {
            isUploading.value = false
            if (file.response?.code === 200) {
                // 更新路径
                const targetIndex = fileList.value.findIndex(item => item.uid === file.uid)

                if (targetIndex !== -1) {
                    fileList.value[targetIndex].url = file.response.data.url
                    fileList.value[targetIndex].fileKey = file.response.data.key
                }

                emits && emits('success', file, key)
                btnEmit && btnEmit('success', file, key)
            } else {
                fileList.value.pop()
                emits && emits('error', file, file.response)
            }
        } else if (file.status === 'error') {
            isUploading.value = false
            fileList.value.pop()
            emits &&
                emits(
                    'error',
                    file,
                    file.response?.response ? JSON.parse(file.response.response) : file.response,
                )
        } else if (file.status === 'uploading') {
            isUploading.value = true
            emits && emits('uploading', file, key)
            btnEmit && btnEmit('uploading', file, key)
        }
        return file
    }

    // 打开文件预览地址。复杂格式可由调用方提供预览服务 URL。
    function previewFile(url: string, { fileType = '' } = {}) {
        const previewUrl = previewUrlResolver
            ? previewUrlResolver(url, fileType)
            : getFileDownloadUrl(url, { downloadBaseUrl })
        window.open(previewUrl)
    }

    return {
        isExporting,
        exportFile,
        downloadFile,
        previewFile,
        uploadFile,
        fileList,
        isUploading,
        deleteFile,
        imageType,
        pdfType,
        wordType,
        excelType,
        otherType,
        videoType,
    }
}
