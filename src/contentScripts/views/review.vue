<script setup lang="ts">
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
const fail = ref(false)

function chat() {
  if (!questions.value || fail.value === true) {
    fail.value = false
    questions.value = '...'
    // 请求数据并赋值
    api.completion({
      model: 'gpt-3.5-turbo-16k',
      messages: [
        {
          role: 'user',
          content: `请扮演一位卡片笔记回顾者，针对卡片笔记的内容提出1到5个相关的问题及回答，以帮助回顾和巩固学习，每个问答用 <br> 分割。【注意，不要超出笔记的提到的内容。】例如：\nQ:问题1<br>A:回答1<br><br>Q:问题2<br>A:回答2<br><br>Q:问题3<br>A:回答3<br><br>Q:问题4<br>A:回答4<br><br>Q:问题5<br>A:回答5\n\n\n需要回顾的内容如下：\n${props.content}`,
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
    }).catch((err) => {
      fail.value = true

      console.error('err', err)
      questions.value = err
    })
  }
}
</script>

<template>
  <el-popover
    v-if="config.host && config.key"
    placement="right"
    :width="400"
    trigger="click"
    @show="chat"
  >
    <template #reference>
      <span v-if="fail" class="i-material-symbols:replay cursor-pointer ml-[12px] " @click="chat" />
      <span v-else class="ml-[12px] i-material-symbols:reviews-outline cursor-pointer text-[#7d7d7d]" />
    </template>

    <pre style="white-space: break-spaces;" v-html="questions" />
  </el-popover>
</template>
