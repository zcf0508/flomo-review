<script setup lang="ts">
import { config } from '~/logic/storage'
</script>

<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <el-form>
      <el-form-item label="Host">
        <el-input v-model="config.host" />
      </el-form-item>
      <el-form-item label="Key">
        <el-input v-model="config.key" />
      </el-form-item>
    </el-form>
  </main>
</template>
