import { makeStyles } from '@material-ui/core';
import { emphasize } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    input: {
        display: 'flex'
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden'
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: theme.spacing(1, 2),
    },
    paper: {
        position: 'absolute',
        zIndex: 1000,
        left: 0,
        right: 0
    },
    divider: {
        height: theme.spacing(2),
    }
}));

export const selectStyles = {
    input: base => ({
        ...base,
        '& input': {
            font: 'inherit',
        }
    }),
    menuList: base => ({
        ...base,
        height: 180
    }),
    indicatorsContainer: () => ({
        display: 'none'
    })
};
