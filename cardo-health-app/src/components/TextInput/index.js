import React from 'react';
import './styles.scss';

function TextInput({ name, value, onChange }) {
    return (
        <div className="comp-ti">
            <label>{name}: </label>
            <input
                className="comp-ti-input"
                type="text"
                onChange={(e) => onChange(e.currentTarget.value)}
                value={value}
            />
        </div>
    );
}

export default TextInput;
