import React from 'react'

const Toolbar = ({ insertHighlight, insertColor }) => {
    return (
        <div id="toolbar" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'fit-content' }}>
                <div>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                    <button className='ql-script' value="sub" />
                    <button className='ql-script' value="super" />
                    <button className="ql-link" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 'fit-content', width: '100%' }}>
                    <button style={{ width: 'fit-content' }} className='ql-highlight' onClick={() => insertHighlight()}> <strong> Highlight </strong> </button>
                    <button style={{ width: 'fit-content' }} className='ql-color' onClick={() => insertColor('red')}> <strong> Color </strong> </button>
                </div>
            </div>
        </div>
    )
}

export default Toolbar