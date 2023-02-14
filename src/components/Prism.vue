<template>
  <pre :class="`language-${language}`">
    <code :class="`language-${language}`" v-html="html" />
  </pre>
</template>

<script setup>
import Prism from 'prismjs'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-json'

const props = defineProps({
  source: { type: String, default: "console.log('Hello world')" },
  language: { type: String, default: 'javascript' }
})

const html = computed(() =>
  Prism.highlight(props.source, Prism.languages[props.language], props.language)
)
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css";

pre[class*="language-"] {
  font-size: 80%;
  border-radius: 0.5rem;
}
</style>
