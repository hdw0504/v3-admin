import fs from 'fs'

describe('Hi', () => {
  it('should works', () => {
    expect(1 + 1).toEqual(2)
  })

  it('test add', () => {
    const foldersName = fs.readdirSync('node_modules/element-plus/es/components')

    expect(foldersName).toMatchInlineSnapshot(`
      [
        "affix",
        "alert",
        "aside",
        "autocomplete",
        "avatar",
        "backtop",
        "badge",
        "base",
        "breadcrumb",
        "breadcrumb-item",
        "button",
        "button-group",
        "calendar",
        "card",
        "carousel",
        "carousel-item",
        "cascader",
        "cascader-panel",
        "check-tag",
        "checkbox",
        "checkbox-button",
        "checkbox-group",
        "col",
        "collapse",
        "collapse-item",
        "collapse-transition",
        "collection",
        "color-picker",
        "config-provider",
        "container",
        "date-picker",
        "descriptions",
        "descriptions-item",
        "dialog",
        "divider",
        "drawer",
        "dropdown",
        "dropdown-item",
        "dropdown-menu",
        "empty",
        "focus-trap",
        "footer",
        "form",
        "form-item",
        "header",
        "icon",
        "image",
        "image-viewer",
        "index.d.ts",
        "index.mjs",
        "index.mjs.map",
        "infinite-scroll",
        "input",
        "input-number",
        "link",
        "loading",
        "main",
        "menu",
        "menu-item",
        "menu-item-group",
        "message",
        "message-box",
        "notification",
        "option",
        "option-group",
        "overlay",
        "page-header",
        "pagination",
        "popconfirm",
        "popover",
        "popper",
        "progress",
        "radio",
        "radio-button",
        "radio-group",
        "rate",
        "result",
        "roving-focus-group",
        "row",
        "scrollbar",
        "select",
        "select-v2",
        "skeleton",
        "skeleton-item",
        "slider",
        "slot",
        "space",
        "step",
        "steps",
        "sub-menu",
        "switch",
        "tab-pane",
        "table",
        "table-column",
        "table-v2",
        "tabs",
        "tag",
        "teleport",
        "time-picker",
        "time-select",
        "timeline",
        "timeline-item",
        "tooltip",
        "tooltip-v2",
        "transfer",
        "tree",
        "tree-select",
        "tree-v2",
        "upload",
        "virtual-list",
        "visual-hidden",
      ]
    `)
  })
})
