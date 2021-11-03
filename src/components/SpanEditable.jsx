import React from 'react';

class SpanEditable extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }
    
    render() {
        return (
            <div
                ref={this.ref}
                onBlur={this.emitChange.bind(this)}
                onInput={this.emitChange.bind(this)}
                contentEditable
                dangerouslySetInnerHTML={{ __html: this.props.html }}
                {...this.props}
            />
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
        console.log(html);
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
        this.lastHtml = html;
    }
}

export default SpanEditable;