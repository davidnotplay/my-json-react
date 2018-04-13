
const json = {
  component: 'List',
  children: []
}

for (let i = 1; i <= 100; i++) {
  json.children.push({
    component: 'Item',
    children: {
      component: 'Link',
      props: {
        text: {
          value: `Link ${i}`
        },
        link: {
          value: `#?link=${i}`
        }
      }
    }
  })
}


export default json