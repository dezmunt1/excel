import {$} from '@core/dom'

export function tableResize($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const isCol = $resizer.data.resize === 'col'
    $resizer.css({
      opacity: 1,
      [isCol ? 'bottom' : 'right']: '-5000px'
    });
    let value;

    document.onmousemove = e => {
      const delta = isCol
        ? Math.floor(e.pageX - coords.right )
        : Math.floor( e.pageY - coords.bottom )

      value = isCol ? coords.width + delta : coords.height + delta

      $resizer.css({
        [isCol ? 'right' : 'bottom']: -delta + 'px'
      })
    }

    document.onmouseup = e => {
      e.preventDefault()
      document.onmousemove = null
      document.onmouseup = null
      if ( isCol ) {
        const allCol = $root.findAll(`[data-col="${$parent.data.col}"]`)
        allCol.forEach( el => el.css({width: value + 'px'}))
      } else {
        $parent.css({height: value + 'px'})
      }
      resolve({
        value,
        id: isCol ? $parent.data.col : $parent.data.row,
        type: isCol ? 'col' : 'row'
      })
      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      })
    }
  })
}
