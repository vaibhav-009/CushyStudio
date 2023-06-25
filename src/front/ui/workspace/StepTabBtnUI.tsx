import type { StepL } from 'src/models/Step'

import { observer } from 'mobx-react-lite'
import { Status } from '../../../back/Status'
import { Button } from 'rsuite'

export const StepTabBtnUI = observer(function StepTabBtnUI_(p: { step: StepL }) {
    const step = p.step
    const parentGraph = step.parentGraph.item
    const focusedBranch = parentGraph.focusedStep.item

    const isFocused = step.id === focusedBranch?.id
    const status = step.data.status
    return (
        <Button
            id={`button-to-focus-step-${step.id}`}
            appearance={isFocused ? 'primary' : 'subtle'}
            color={isFocused ? 'yellow' : undefined}
            onKeyDown={(e) => {
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    step.delete()
                    e.preventDefault()
                    e.stopPropagation()
                    return
                }
                if (e.key === 'ArrowRight') {
                    const ix = parentGraph.childSteps.items.indexOf(step)
                    if (ix === parentGraph.childSteps.items.length - 1) return
                    const next = parentGraph.childSteps.items[ix + 1]

                    if (next) parentGraph.focusStepAndUpdateDraft(next)
                    window.document.getElementById(`button-to-focus-step-${next.id}`)?.focus()
                    e.preventDefault()
                    e.stopPropagation()
                    return
                }
                if (e.key === 'ArrowLeft') {
                    const ix = parentGraph.childSteps.items.indexOf(step)
                    if (ix === 0) return
                    const prev = parentGraph.childSteps.items[ix - 1]
                    if (prev) parentGraph.focusStepAndUpdateDraft(prev)
                    window.document.getElementById(`button-to-focus-step-${prev.id}`)?.focus()
                    e.preventDefault()
                    e.stopPropagation()
                    return
                }
            }}
            size='xs'
            key={step.id}
            style={{
                fontWeight: isFocused ? 'bold' : undefined,
                borderTop:
                    status === Status.Failure //
                        ? '2px solid red'
                        : status === Status.Success //
                        ? '2px solid gray'
                        : '2px solid purple',
            }}
            onClick={() => {
                parentGraph.update({ focusedStepID: step.id })
                // editableBranch?.update({
                //     toolID: step.tool.id,
                //     params: step.data.params,
                // })
            }}
        >
            <div>
                {/* {renderStatus2(step.data.status)}  */}
                {step.tool.item?.data.name}({step.outputGraph.item.childSteps.items.length})
            </div>
        </Button>
    )
})

// export const StepUI = observer(function StepUI_(p: { step: StepL; depth: number }) {
//     const step = p.step
//     return (
//         <div>
//             <GraphUI graph={step.outputGraph.item} depth={p.depth} />
//         </div>
//     )
// })