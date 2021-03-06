/* eslint-disable no-undef */
describe('emojidexPalette:Search', () => {
  beforeAll(async done => {
    await beforePalette()
    done()
  })

  afterAll(async done => {
    await afterPalette()
    done()
  })

  it('search tab', async done => {
    await showPalette()
    $('#tab-search a').click()
    $('#palette-emoji-search-input').val('face')
    await watchDOM('#tab-content-search', {
      trigger: () => {
        $('#palette-emoji-search-submit').click()
      },
      regex: /search-emoji-list/
    })

    expect($($('#tab-content-search').find('img')[0]).attr('title')).toContain('face')
    done()
  })

  it('switches to the next page', async done => {
    await watchDOM('#tab-content-search', {
      trigger: () => {
        $('#tab-content-search').find('.pagination .palette-pager')[1].click()
      }
    })
    expect($('.search-pagination').find('ul.pagination li.palette-num span').text().substr(0, 1)).toBe('2')
    done()
  })

  it('switches to the previous page', async done => {
    await watchDOM('#tab-content-search', {
      trigger: () => {
        $('#tab-content-search').find('.pagination .palette-pager')[0].click()
      }
    })
    expect($('.search-pagination').find('ul.pagination li.palette-num span').text().substr(0, 1)).toBe('1')
    done()
  })

  it('if not puremium user, cannot sorting', done => {
    const selector = $('#tab-content-search').find('.sort-selector')
    expect(selector.length).toEqual(0)
    done()
  })

  if (hasPremiumAccount()) {
    describe('premium user', () => {
      it('show sort selector', async done => {
        await tryLoginUser(premiumUserInfo.auth_user, premiumUserInfo.password)
        await watchDOM('#tab-content-search')
        $('#tab-search a').click()
        const selector = $('#tab-content-search').find('.sort-selector')
        expect(selector.length).toEqual(1)
        done()
      })

      describe('sort', () => {
        const target = '#tab-content-search'
        for (let i = 0; i < sortTypes.length; i++) {
          const sortType = sortTypes[i]
          it(`sort: ${sortType}`, async done => {
            const emojiName = await getEmojiCodeFromSearchAPI('face', sortType)
            await changeSortSelector(target, sortType, /search-emoji-list/)
            expect($($(target).find('img')[0]).attr('title')).toEqual(emojiName)
            done()
          })
        }
      })
    })
  }
})
/* eslint-enable no-undef */
