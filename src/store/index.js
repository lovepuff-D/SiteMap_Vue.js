import {createStore} from 'vuex'

import siteMap from '@/assets/sitemap-generator.postman_collection.json'

export default createStore({
    state: {
        isLoading: false,
        percentOfLoading: '',
        resultOfTask: ''
    },
    getters: {},
    mutations: {
        ADD_LINK_TO_DOWNLOAD(state, payload) {
            state.resultOfTask = payload
        },
        CHANGE_STATUS_OF_LOADING(state, payload) {
            state.isLoading = payload
        },
        ADD_PERCENT_OF_LOADING(state, payload) {
            if (payload || payload === 0) {
                state.percentOfLoading = payload.toFixed(0)
            }
        }
    },
    actions: {
        async createTask({dispatch, commit}, {url, email}) {
            //console.log(url)

            //Сбивает процент загрузки
            commit('ADD_PERCENT_OF_LOADING', 0)

            let response = await fetch('https://api.sitemap-generator.ru/task', {
                method: 'POST',
                headers: {
                    'authority': 'api.sitemap-generator.ru',
                    'accept': 'application/json, text/plain, */*',
                    'accept-language': 'ru,en;q=0.9',
                    'cache-control': 'no-cache',
                    'content-type': 'application/json;charset=UTF-8',
                    'origin': 'https://sitemap-generator.ru',
                    'pragma': 'no-cache',
                    'referer': 'https://sitemap-generator.ru/',
                    'sec-ch-ua': '\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '\"macOS\"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-site',
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                },
                body: JSON.stringify({
                    email: `${email}`,
                    origin: `${url}`,
                })
            })
                .then(async response => {
                    //По завершению формировании таска, начинаем проверять статус выполнения таска
                    let json = await response.json()
                    dispatch('checkStatus', json.id)
                })
        },

        async checkStatus({commit, dispatch}, id) {
            /*console.log('from checkStatus', id)*/

            //Меняем статус загруки на активный, чтобы корректно отрабатывал loading bar
            commit('CHANGE_STATUS_OF_LOADING', true)

            //Каждую секунду делает запрос на проверку окончания задачи по формировании файла
            let checkStatusInterval = setInterval(async () => {
                let response = await fetch(`https://api.sitemap-generator.ru/task/stats/${id}`, {
                    method: 'GET',
                    headers: {
                        'authority': 'api.sitemap-generator.ru',
                        'accept': 'application/json, text/plain, */*',
                        'accept-language': 'ru,en;q=0.9',
                        'cache-control': 'no-cache',
                        'content-type': 'application/json;charset=UTF-8',
                        'origin': 'https://sitemap-generator.ru',
                        'pragma': 'no-cache',
                        'referer': 'https://sitemap-generator.ru/',
                        'sec-ch-ua': '\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '\"macOS\"',
                        'sec-fetch-dest': 'empty',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-site': 'same-site',
                        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                    },
                })

                let result = await response.json()

                commit('ADD_PERCENT_OF_LOADING', (result.current / result.totalCount) * 100)

                if (result.finished) {
                    //По завершению формировании таска, запрашиваем ответ с линкой
                    dispatch('getTaskInfo', id)
                    clearInterval(checkStatusInterval)
                }

            }, 1000)
        },

        async getTaskInfo({commit}, id) {
            let response = await fetch(`https://api.sitemap-generator.ru/task/${id}`, {
                method: 'GET',
                headers: {
                    'authority': 'api.sitemap-generator.ru',
                    'accept': 'application/json, text/plain, */*',
                    'accept-language': 'ru,en;q=0.9',
                    'cache-control': 'no-cache',
                    'content-type': 'application/json;charset=UTF-8',
                    'origin': 'https://sitemap-generator.ru',
                    'pragma': 'no-cache',
                    'referer': 'https://sitemap-generator.ru/',
                    'sec-ch-ua': '\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '\"macOS\"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-site',
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                },
            })

            //Меняем статус загруки на не активный, чтобы корректно отрабатывал loading bar
            commit('CHANGE_STATUS_OF_LOADING', false)
            //добавляем в state результат от запроса
            commit('ADD_LINK_TO_DOWNLOAD', await response.json())
        }
    },
    modules: {}
})
