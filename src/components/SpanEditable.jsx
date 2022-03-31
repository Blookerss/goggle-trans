import React from 'react';
import { styled } from '@stitches/react';

const StyledSpan = styled('span');

export default class SpanEditable extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }
    
    render() {
        return (
            <StyledSpan
                ref={this.ref}
                onBlur={this.emitChange.bind(this)}
                onInput={this.emitChange.bind(this)}
                contentEditable
                suppressContentEditableWarning={true}
                {...this.props}
            >
                {this.props.html}
            </StyledSpan>
        );
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.html !== this.ref.current.innerHTML;
    }

    componentDidUpdate() {
        if (this.props.html !== this.ref.current.innerHTML) {
            this.ref.current.innerHTML = this.props.html;
        }
    }

    emitChange() {
        let html = this.ref.current.innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    }
};