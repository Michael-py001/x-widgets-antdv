/**
 * 下载各种类型文件工具函数
 * @author WuShiLi
 */
import axios from 'axios'
import { fileTypes } from './fileTypes'

/**
 * 使用提供的API函数下载blob。
 *
 * @param {Function} apiFunc - 用于下载的API函数 接口必须写上返回格式 responseType: 'blob'
 * @param {Options} options - 包含downloadName和fileType的对象
 * @return {Promise<any>} 一个Promise，返回下载的数据或错误
 */
interface Options {
    downloadName?: string
    fileType?: string
}
export async function downloadBolb(
    apiFunc: () => Promise<any>,
    { downloadName = '', fileType = '' }: Options = {},
): Promise<any> {
    if (!apiFunc) {
        throw new Error('请传入接口函数')
    }
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apiFunc()
            const type = res?.headers ? res.headers?.['content-type'] : ''
            // 读取文件流中的错误信息
            if (type && fileType && !type.includes(fileTypes[fileType])) {
                const reader = new FileReader()
                reader.onload = function () {
                    const errText = reader.result || ''
                    const errMessage = JSON.parse(errText?.toString())?.message
                    reject(errMessage)
                }
                reader.readAsText(res.data)
                return
            }

            if (res && res.data && !res.data.code) {
                const blob = new Blob([res.data], { type: fileTypes[fileType] })
                const _link = document.createElement('a')
                _link.href = window.URL.createObjectURL(blob)
                const contentDisposition = res.headers['content-disposition']
                let responseFileName = ''
                if (contentDisposition) {
                    const contentDispositionArr = contentDisposition.split('.')
                    fileType = contentDispositionArr[contentDispositionArr.length - 1]
                    const match = contentDisposition.match(/filename=(.+)/)
                    if (match && match[1]) {
                        responseFileName = decodeURIComponent(match[1])
                        _link.download = responseFileName
                    }
                } else {
                    _link.download = (downloadName ? downloadName + '-' : '') + `.${fileType}`
                }
                _link.click()
                _link.remove()
                resolve(res)
            } else {
                reject(res)
            }
        } catch (err) {
            reject(err)
        }
    })
}

/**
 * 从指定的URL获取Blob。
 *
 * @param {string} url - 资源的URL
 * @return {Promise<Blob>} 返回一个Blob的Promise
 */
function getBlob(url: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                responseType: 'blob',
            })
            .then(function (response) {
                resolve(response.data)
            })
            .catch(res => {
                reject(res)
            })
    })
}

/**
 * 下载来自指定 URL 的文件，兼容blob地址，并使用指定的名称和可选延迟。
 *
 * @param {string} url - 要下载的文件的 URL。
 * @param {string} name - 保存文件名称。
 * @param {number} [delay=800] - 开始下载之前的可选延迟（以毫秒为单位）。
 * @return {Promise<boolean>} 当文件成功下载时返回为 true 的 Promise。
 *
 */

export function downloadFile(url: string, name: string, delay: number = 800): Promise<boolean> {
    return new Promise(resolve => {
        // 或使用实验性方法window.showSaveFilePicker()
        setTimeout(async () => {
            if (url.startsWith('blob:')) {
                const a = document.createElement('a')
                const blob = await getBlob(url)
                const blobUrl = window.URL.createObjectURL(blob)
                a.href = blobUrl
                a.download = name
                a.click()
                a.remove()
                setTimeout(() => {
                    URL.revokeObjectURL(blobUrl)
                }, 10000)
            } else {
                await downloadFileLegacy(url, name, delay)
            }
            resolve(true)
        }, delay)
    })
}
/**
 * 下载普通静态资源文件，并使用指定的名称和可选延迟。
 *
 * @param {string} url - 要下载的文件的 URL。
 * @param {string} name - 保存文件名称。
 * @param {number} [delay=800] - 开始下载之前的可选延迟（以毫秒为单位）。
 * @return {Promise<boolean>} 当文件成功下载时返回为 true 的 Promise。
 */
export function downloadFileLegacy(
    url: string,
    name: string,
    delay: number = 800,
): Promise<boolean> {
    return new Promise(resolve => {
        setTimeout(async () => {
            const a = document.createElement('a')
            a.href = url + '?content-type=application/octet-stream'
            const regex = /(\.[\w-]+)$/
            const match = url?.match(regex)
            const suffix = match ? match[1] : null
            a.download = name + suffix
            a.click()
            a.remove()
            resolve(true)
        }, delay)
    })
}
