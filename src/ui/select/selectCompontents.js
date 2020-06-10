import React from "react";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { TextValidator } from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';

const inputComponent = ({ inputRef, ...props }) => {
    return <div ref={inputRef} {...props} />;
};

inputComponent.propTypes = {
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

const Control = props => {
    const {
        children,
        innerProps,
        innerRef,
        selectProps: { classes, TextFieldProps },
    } = props;

    return (
        <TextValidator
            id="single-select-autocomplete"
            name="single-select-autocomplete"
            fullWidth
            margin="dense"
            variant="outlined"
            InputProps={{
                inputComponent,
                inputProps: {
                    className: classes.input,
                    ref: innerRef,
                    children,
                    ...innerProps
                },
            }}
            {...TextFieldProps}
        />
    );
};

Control.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    selectProps: PropTypes.object.isRequired,
};

const NoOptionsMessage = props => {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
};

NoOptionsMessage.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired,
};

const Option = props => {
    return (
        <MenuItem
            ref={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
};

Option.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
};

const SingleValue = props => {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
};

SingleValue.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired,
};

const ValueContainer = props => {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
};

ValueContainer.propTypes = {
    children: PropTypes.node,
    selectProps: PropTypes.object.isRequired,
};

const Menu = props => {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
};

Menu.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object,
};

const selectComponents = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    SingleValue,
    ValueContainer,
};

export default selectComponents;
