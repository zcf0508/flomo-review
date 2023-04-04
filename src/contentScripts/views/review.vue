<script setup lang="ts">
import 'uno.css'
import Api2d from 'api2d'
import { config } from '~/logic/storage'

const props = defineProps({
  content: {
    type: String,
    default: () => '',
  },
})

const timeout = 1000 * 60 // 60秒超时
const api = new Api2d(config.value.key, config.value.host, timeout)

const questions = ref('')

function show() {
  if (!questions.value) {
    // 请求数据并赋值
    api.completion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `【${props.content}】针对以上内容提出5个问题，每个问题之后增加br标签换行`,
        },
      ],
      stream: true, // 支持 stream，注意stream为 true 的时候，返回值为undefined
      onMessage: (string: string) => {
        questions.value = string
      },
      onEnd: (string: string) => {
        // eslint-disable-next-line no-console
        console.log('end', string)
        questions.value = string
      },
    })
  }
}
</script>

<template>
  <el-popover v-if="config.host && config.key" placement="right" :width="400" trigger="click" @show="show">
    <template #reference>
      <span class="ml-[12px] i-material-symbols:reviews-outline cursor-pointer text-[#7d7d7d]" />
    </template>
    <div v-html="questions" />
  </el-popover>
</template>
