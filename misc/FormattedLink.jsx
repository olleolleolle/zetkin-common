import React from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router';


@injectIntl
export default class FormattedLink extends React.Component {
    static propTypes = {
        msgId: React.PropTypes.string.isRequired,
        msgValues: React.PropTypes.object,
        href: React.PropTypes.string,
        onClick: React.PropTypes.func,
        className: React.PropTypes.string,
        target: React.PropTypes.string,
        forceRefresh: React.PropTypes.bool,
    };

    render() {
        let id = this.props.msgId;
        let href = this.props.href;
        let formatMessage = this.props.intl.formatMessage;
        let msg = formatMessage({ id }, this.props.msgValues);

        if (this.props.forceRefresh || !href || href.indexOf('//') === 0
            || href.indexOf('http') === 0) {

            if (href && href.indexOf('//') === 0) {
                href = ((process.env.NODE_ENV === 'production')?
                    'https:' : 'http:') + href;
            }

            return (
                <a href={ href }
                    target={ this.props.target }
                    className={ this.props.className }
                    onClick={ this.props.onClick }>
                    { msg }
                </a>
            );
        }
        else {
            return (
                <Link className={ this.props.className }
                    onClick={ this.props.onClick }
                    to={ href }>{ msg }</Link>
            );
        }
    }
}
