import { defineComponent, isVNode } from 'vue'
import { MoreOutlined } from '@ant-design/icons-vue'
import { Dropdown, Button, Space } from 'ant-design-vue'

/**
 * @description: 表格操作按钮-更多按钮
 * @author WuShiLi
 */
export default defineComponent({
  name: 'DropdownButtonList',
  props: {
    // 按钮间距
    gap: {
      type: Number,
      default: 5,
    },
  },
  setup(props, { slots }) {
    return () => {
      const trueSlots = []
      const slotList = Object.values(slots).map(render => render?.())
      for (let list of slotList) {
        if (list instanceof Array) {
          for (let item of list) {
            if (isVNode(item) && typeof item.children !== 'string') {
              trueSlots.push(item)
            }
          }
        }
      }
      let baseBtn = []
      let moreBtn: any = []

      if (trueSlots.length <= 3) {
        baseBtn = trueSlots
      } else {
        // 获取前两个元素
        baseBtn = trueSlots.slice(0, 3) || []
        // 获取剩余元素
        moreBtn = trueSlots.slice(3) || []
      }

      return (
        <Space size={props.gap}>
          {...baseBtn}
          <Dropdown trigger={['click', 'hover']}>
            {{
              overlay: () => {
                return (
                  <Space size={props.gap} class="flex flex-col">
                    {...moreBtn}
                  </Space>
                )
              },
              default: () => {
                if (moreBtn.length > 0) {
                  return (
                    <Button type="link" size="small" style="padding: 0;">
                      {/* <span>更多</span> */}
                      <span class="font-bold">
                        <MoreOutlined />
                      </span>
                    </Button>
                  )
                }
              },
            }}
          </Dropdown>
        </Space>
      )
    }
  },
})
