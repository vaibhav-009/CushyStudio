import { Card } from '@fluentui/react-components'
import { useSpring, animated } from '@react-spring/web'
import { observer } from 'mobx-react-lite'
import { Fragment, ReactNode } from 'react'
import { exhaust } from '../core/ComfyUtils'
import { ScriptStep } from '../core/ScriptStep'
import { ScriptStep_askBoolean, ScriptStep_askString } from '../core/ScriptStep_ask'
import { ScriptStep_Init } from '../core/ScriptStep_Init'
// import { ScriptStep_Output } from '../core/ScriptStep_Output'
import { ScriptStep_prompt } from '../core/ScriptStep_prompt'
import { Execution_askBooleanUI } from './Execution_askBooleanUI'
import { Execution_askStringUI } from './Execution_askStringUI'
import { NodeListUI } from './NodeListUI'
import { useSt } from './stContext'

export const ExecutionUI = observer(function ExecutionUI_(p: {}) {
    const st = useSt()
    const project = st.project
    const run = project.currentRun
    if (run == null)
        return (
            <div
                style={{
                    // alignItems: 'center',
                    justifyContent: 'center',
                    // background: 'red',
                    height: '100%',
                    display: 'flex',
                    overflow: 'auto',
                }}
            >
                <h3>No execution yet, hit run in the Code Toolbar </h3>
            </div>
        )
    return (
        <div className='col gap' style={{ overflow: 'auto' }}>
            {run.steps.map((step) => (
                <StepWrapperUI key={step.uid} step={step} />
            ))}
        </div>
    )
})

export const StepWrapperUI = observer(function StepWrapperUI_(p: { step: ScriptStep }) {
    const props = useSpring({
        from: { opacity: 0, transform: 'translate3d(0,-20px,0)' },
        to: { opacity: 1, transform: `translate3d(0,0px,0)` },
    })

    return (
        <animated.div style={props}>
            <Card>{renderStep(p.step)}</Card>
        </animated.div>
    )
})

const renderStep = (step: ScriptStep) => {
    if (step instanceof ScriptStep_Init) return <Fragment key={step.uid}>Init</Fragment>
    // if (step instanceof ScriptStep_Output) return <Fragment key={step.uid}>Output</Fragment>
    if (step instanceof ScriptStep_prompt)
        return (
            <Fragment key={step.uid}>
                {/* <CardHeader description={'Prompt'}></CardHeader> */}
                <NodeListUI graph={step._graph} />
            </Fragment>
        )
    if (step instanceof ScriptStep_askBoolean) return <Execution_askBooleanUI key={step.uid} step={step} />
    if (step instanceof ScriptStep_askString) return <Execution_askStringUI key={step.uid} step={step} />

    return exhaust(step)
}

export const ExecutionWrapperUI = observer(function ExecutionWrapperUI_(p: { children: ReactNode }) {
    return <Card>{p.children}</Card>
})
