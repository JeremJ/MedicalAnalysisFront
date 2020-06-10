import React from 'react';
import CreatableSelect from 'react-select/creatable';
import NoSsr from '@material-ui/core/NoSsr';
import { useStyles, selectStyles } from './creatable-select-autocomplete.styles';

import selectComponents from '../selectCompontents';

const CreatableSelectAutocomplete = props => {
    const classes = useStyles();
    const { options, onSelect, required, label, selectedValue } = props;
    const [value, setValue] = React.useState(selectedValue);

    const handleChange = value => {
        setValue(value);
        onSelect(value);
    };


    return (
        <div className={classes.root}>
            <NoSsr>
                <CreatableSelect
                    classes={classes}
                    styles={selectStyles}
                    inputId="react-select-creatable"
                    TextFieldProps={{
                        label: label,
                        InputLabelProps: {
                            htmlFor: 'react-select-creatable'
                        },
                        required,
                        validators: required ? ['required'] : [],
                        errorMessages: ['To pole jest wymagane'],
                        value: value || ''
                    }}
                    placeholder=""
                    options={options}
                    components={selectComponents}
                    value={value}
                    onChange={handleChange}
                    isClearable={true}
                    formatCreateLabel={userInput => `Utwórz: "${userInput}"`}
                    noOptionsMessage={() => 'Brak danych'}
                />
            </NoSsr>
        </div>
    );
};

export default CreatableSelectAutocomplete;
