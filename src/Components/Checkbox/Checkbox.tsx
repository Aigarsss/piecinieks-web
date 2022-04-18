import React from 'react';
import classes from './checkbox.module.scss';

type CheckboxProps = {
    fieldType: string;
    label: string;
    value: string;
    checked: boolean;
    onChange: (fieldType: any, e: any) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ fieldType, label, value, checked, onChange }) => {
    return (
        <span className={classes.checkbox}>
            <input
                className="opacity-0 absolute"
                name={value}
                id={value}
                value={value}
                checked={checked}
                type="checkbox"
                onChange={(e) => onChange(fieldType, e)}
            />
            <label className="select-none" htmlFor={value}>
                {label}
            </label>
        </span>
    );
};

export default Checkbox;
