import React from 'react';
import MatButton from '@material-ui/core/Button';

interface Button {
    fontWeight:number;
    children:any;
}

/**
 * Creates a button
 * @param fontWeight sets the fontweight of the button
 * @param children sets the children of the button
 * @returns returns a button
 */
export default function Button(props: Button){
    return (
        <MatButton {...props} color="secondary" style={{fontWeight: props.fontWeight}}>{props.children}</MatButton>
    );
}
