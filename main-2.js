// modify the code below
        'use strict';

        
       var ResultItem = React.createClass({
            render: function(){
                return (
                    
                    <li className="list-group-item" key={this.props.index}>{this.props.result}</li>
                );
            }
        });

        var ResultContainer = React.createClass({
            render: function(){
                
                var items = this.props.searchResult.map(function(app,index){
                    return <ResultItem key={index} result={app.trackName} /> 
                });

                return(
                    <ul className="list-group">
                        {items}
                    </ul>           
                );
            }
        });2

        var SearchContainer = React.createClass({
            render: function(){
                return (
                    
                        <div className="col-lg-12">
                            <input type="text" ref="query" />
                            <select ref="category">
                                <option value="software">Apps</option>
                                <option value="movie">Films</option>
                            </select>
                            <input type="submit" onClick={this.createAjax} />
                         </div>
                       
                );
            },
            createAjax: function(){
                var query       = React.findDOMNode(this.refs.query).value;
                var category    = React.findDOMNode(this.refs.category).value;
                var URL = 'https://itunes.apple.com/search?term=' + query +'&country=us&entity=' + category;
                this.props.search(URL)
            }
        });

        var SearchApp = React.createClass({
            getInitialState: function(){
                return {
                    searchResult: []
                }
            },
            render: function(){
                return (
                    <div>
                    <SearchContainer 
                        search={this.search} />
                    <ResultContainer 
                        searchResult={this.state.searchResult} />

                    </div>
                );
            },
            showApps: function(response){
                this.setState({
                    searchResult: response.results
                })
            },
            search: function(URL){
                $.ajax({
                    type: "GET",
                    dataType: 'jsonp',
                    url: URL,
                    success: function(response){
                        this.showApps(response);
                    }.bind(this)
                });
            }
        });

        React.render(<SearchApp />,  document.getElementById("content"));