var React = require('react');
var TemplatesManagerRow = require('./TemplatesManagerRow');

import store from 'stores/templatesStore';

var TemplatesManager = React.createClass({

    getDefaultProps() {
        return {
            disabled: false,
            store
        };
    },

    componentDidMount: function() {

        store.entity = this.props.entity;
        store.configurator = this.props.configurator;

        this.updateHandler = function() {
            this.forceUpdate();
        }.bind(this);

        this.props.store.on('update', this.updateHandler);

        if (!this.disabled) this.props.store.read();

    },

    componentWillUnmount: function() {
        this.props.store.removeListener('update', this.updateHandler);
    },

    render: function() {

        const {disabled, store} = this.props;

        if (disabled) return null;

        return (
            <div className="templates-mashap">
                <div className="tm-add-btn tau-icons-general-before" onClick={this.handleCreateTemplate}>
                    {'Add template'}
                </div>
                <table className="tm-grid">
                    {store.items.map((v) => (
                        <TemplatesManagerRow item={v} key={v.key} store={store} />
                    ))}
                </table>
            </div>
        );

    },

    handleCreateTemplate: function() {
        this.props.store.createTemplate();
    }
});

module.exports = TemplatesManager;
