import React from 'react'

const Toolbar = ({ insertHighlight, insertColor }) => {
    return (
        <div id="toolbar" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                    <button className='ql-script' value="sub" />
                    <button className='ql-script' value="super" />
                    <button className="ql-link" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <button style={{ width: 'fit-content' }} className='ql-highlight' onClick={() => insertHighlight()}> <strong> Highlight </strong> </button>
                    <button style={{ width: 'fit-content' }} className='ql-color' onClick={() => insertColor('red')}> <strong> Color </strong> </button>
                </div>
                <div>
                    <button className="ql-list" value="ordered"></button>
                    <button className="ql-list" value="bullet"></button>
                    <button className="ql-indent" value="-1"></button>
                    <button className="ql-indent" value="+1"></button>
                </div>
            </div>
        </div>
    )
}

export default Toolbar