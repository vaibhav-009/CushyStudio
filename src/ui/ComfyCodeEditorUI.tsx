import type { TypescriptBuffer } from './code/TypescriptBuffer'
import type { IStandaloneCodeEditor } from './TypescriptOptions'

import { Spinner } from '@fluentui/react-components'
import MonacoEditor, { Monaco } from '@monaco-editor/react'
import { observer } from 'mobx-react-lite'

export const TypescriptEditorUI = observer(function ComfyCodeEditorUI_(p: {
    //
    buffer: TypescriptBuffer
}) {
    const buff = p.buffer
    const textModel = buff.textModel
    if (textModel == null) return <Spinner />
    return (
        <MonacoEditor
            height='100vh'
            path={p.buffer.monacoPath}
            keepCurrentModel
            theme='vs-dark'
            onChange={(e) => buff.udpateCodeFromEditor(e)}
            onMount={(editor: IStandaloneCodeEditor, _monaco: Monaco) => {
                editor.updateOptions({ wordWrap: 'off' })
                editor.setModel(textModel)
            }}
        />
    )
})
