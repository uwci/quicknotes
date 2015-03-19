
var TagCount = React.createClass({

  click: function(e) {
    e.preventDefault();
    this.props.onTagSelected(this.props.tagName);
  },

  render: function() {
    return (
      <div className="tag" onClick={this.click}>
        <span className="tagName">{this.props.displayName}</span>&nbsp;
        <span className="tagCount">{this.props.count}</span>
      </div>
    );
  }
});

module.exports = TagCount;
