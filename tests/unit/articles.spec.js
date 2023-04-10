import { mount, flushPromises } from '@vue/test-utils'
import axios from 'axios'
import MainContent from '@/components/MainContent.vue'
import ArticleItem from "@/components/ArticleItem.vue";

const { articleArray } = require('./example');
const { article } = require('./example');

const sortByAlphabet = '2';
const sortByDateDesc = '3';
const sortByDateAsc = '4';

jest.spyOn(axios, 'get').mockResolvedValue(articleArray)
test('test articles and filters', async () => {
  const wrapper = mount(MainContent)

  expect(axios.get).toHaveBeenCalledTimes(1)
  await flushPromises()

  // test loading articles
  const articles = wrapper.findAll('[class="article"]')
  expect(articles).toHaveLength(3)
  expect(articles[0].text()).toContain('Author1')
  expect(articles[0].text()).toContain('Title1')
  expect(articles[1].text()).toContain('Author2')
  expect(articles[1].text()).toContain('Title2')
  expect(articles[2].text()).toContain('Author3')
  expect(articles[2].text()).toContain('Title3')

  // test filtering by author
  await wrapper.find('input').setValue('Author1')
  let filteredArticles = wrapper.findAll('[class="article"]')
  expect(filteredArticles).toHaveLength(1)
  expect(filteredArticles[0].text()).toContain('Author1')

  // test filtering by title
  await wrapper.find('input').setValue('Title2')
  filteredArticles = wrapper.findAll('[class="article"]')
  expect(filteredArticles).toHaveLength(1)
  expect(filteredArticles[0].text()).toContain('Title2')

  // clear filter
  await wrapper.find('input').setValue('')
  filteredArticles = wrapper.findAll('[class="article"]')
  expect(filteredArticles).toHaveLength(3)

  // test filter by latest year
  await wrapper.find('[type="checkbox"]').setChecked(true)
  filteredArticles = wrapper.findAll('[class="article"]')
  expect(filteredArticles).toHaveLength(1)
  expect(filteredArticles[0].text()).toContain('Feb 02')

  // clear checkbox filter
  await wrapper.find('[type="checkbox"]').setChecked(false)
  filteredArticles = wrapper.findAll('[class="article"]')
  expect(filteredArticles).toHaveLength(3)

  const options = wrapper.find('select').findAll('option')

  // test sorting by date asc
  await options.at(3).setSelected()
  expect(wrapper.find('option:checked').element.value).toBe(sortByDateAsc)
  filteredArticles = wrapper.findAll('[class="article"]')
  expect(filteredArticles[0].text()).toContain('Title2')
  expect(filteredArticles[1].text()).toContain('Title3')
  expect(filteredArticles[2].text()).toContain('Title1')

  // test sorting by date desc
  await options.at(2).setSelected()
  expect(wrapper.find('option:checked').element.value).toBe(sortByDateDesc)
  filteredArticles = wrapper.findAll('[class="article"]')
  expect(filteredArticles[0].text()).toContain('Title1')
  expect(filteredArticles[1].text()).toContain('Title3')
  expect(filteredArticles[2].text()).toContain('Title2')

  // test sorting by alphabet
  await options.at(1).setSelected()
  expect(wrapper.find('option:checked').element.value).toBe(sortByAlphabet)
  filteredArticles = wrapper.findAll('[class="article"]')
  expect(filteredArticles[0].text()).toContain('Author1')
  expect(filteredArticles[1].text()).toContain('Author2')
  expect(filteredArticles[2].text()).toContain('Author3')

})

test('check like/unlike button', async () => {
  const wrapper = mount(ArticleItem, {
    propsData: { article }
  });

  await wrapper.get('button').trigger('click')
  expect(wrapper.text()).toMatch('11 likes')

  await wrapper.get('button').trigger('click')
  expect(wrapper.text()).toMatch('10 likes')
})
