import { marked } from 'marked'
import { observer } from 'mobx-react-lite'
import { Widget_markdown } from 'src/controls/Widget'

export const WidgetMardownUI = observer(function WidgetMardownUI_(p: { req: Widget_markdown }) {
    const req = p.req
    return <div className='_MD' dangerouslySetInnerHTML={{ __html: marked(req.input.markdown) }}></div>
})
