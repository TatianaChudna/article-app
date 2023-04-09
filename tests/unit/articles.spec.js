import { mount, flushPromises } from '@vue/test-utils'
import MainContent from '@/components/MainContent.vue'
import axios from 'axios'

const { articleArray } = require('./example');

jest.spyOn(axios, 'get').mockResolvedValue(articleArray)
console.log(articleArray)
test('load articles on mount component', async () => {
  const wrapper = mount(MainContent)

  // Let's assert that we've called axios.get the right amount of times and
  // with the right parameters.
  expect(axios.get).toHaveBeenCalledTimes(1)

  // Wait until the DOM updates.
  await flushPromises()

  // Finally, we make sure we've rendered the content from the API.
  const posts = wrapper.findAll('[class="article-size"]')

  expect(posts).toHaveLength(2)
  expect(posts[0].text()).toContain('Special developer')
  expect(posts[1].text()).toContain('Testing enthusiast')
})
