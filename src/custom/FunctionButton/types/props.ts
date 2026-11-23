import type { ButtonProps } from 'ant-design-vue'
import { PropType, ExtractPropTypes } from 'vue'

export interface FunctionButtonOptionsType {
    uploadComponent: 'Upload' | 'UploadDragger'
    btnText?: string
    exportAPI?: () => Promise<any> | null // 导出API函数
    exportParams?: any // 导出参数
    uploadURL?: string //导入/上传普通文件/图片api地址
    uploadVideoURL?: string //导入/上传视频api地址
    uploadData?: object //上传的data参数
    uploadHeaders?: Record<string, string> // 上传的headers参数
    uploadAcceptTypes?: string //上传的格式
    downloadURL?: string //下载地址
    previewURL?: string //预览地址
    fileName?: string //下载文件名称
    fileType?: string //下载文件格式/类型
    imgMaxSize?: number //图片最大大小
    videoMaxSize?: number //视频最大大小
    pdfMaxSize?: number //pdf最大大小
    wordMaxSize?: number //word最大大小
    excelMaxSize?: number //excel最大大小
    fileMaxSize?: number //文件最大大小

    imgMinSize?: number //图片最小大小 以k为单位
    videoMinSize?: number //视频最小大小
    pdfMinSize?: number //pdf最小大小
    wordMinSize?: number //word最小大小
    excelMinSize?: number //excel最小大小
    fileMinSize?: number //文件最小大小
    maxCount?: number //最大文件数
    downloadBaseUrl?: string //相对文件路径的下载基地址
    previewUrlResolver?: (url: string, fileType: string) => string //自定义预览地址解析器
    showProgress?: boolean //是否显示上传进度
    progressText?: string //上传进度文字
    printAPI?: string // 打印数据接口标识
    printPageURL?: string // 宿主应用提供的打印页面地址
    validateFilename?: boolean // 是否需要校验文件名
    onExportSuccess?: (res: any) => void // 导出成功回调
    onExportError?: (err: any) => void // 导出失败回调
}

export const FunctionButtonOptions = () => {
    return {
        options: {
            type: Object as () => PropType<FunctionButtonOptionsType>,
            default: () => ({
                btnText: '',
                exportAPI: '',
                exportParams: null,
                uploadURL: '',
                uploadData: {},
                uploadAcceptTypes: '.xls, .xlsx',
                downloadURL: '',
                previewURL: '',
                fileName: '',
                fileType: '',
                imgMaxSize: 10,
                fileMaxSize: 25,
                maxCount: null,
                downloadBaseUrl: '',
            }),
        },
        fileList: {
            type: Array,
            default: [],
        },
        // 按钮key
        btnkey: {
            type: [String, Number, Object],
            default: '',
        },
    }
}
export type FunctionButtonOptionsProps = Partial<
    ExtractPropTypes<ReturnType<typeof FunctionButtonOptions>>
>

export type FunctionButtonProps = ButtonProps & FunctionButtonOptionsProps
