import React from "react";
import BarChart from "./barChart";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        }
    }

    render() {
        const DATA = this.props.data;
        return(
            <main className="container">
                <section className="row my-5">
                    <div className="col-12">
                        <h1>COVID Tracker</h1>
                    </div>
                </section>
                <section className="row">
                    <div className="col-md-4 mb-5">
                        <div className="tile">
                            <span className="count-active">{this.props.activeTotal.toLocaleString('en-IN')}</span>
                            <span className="label">Active</span>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <div className="tile">
                            <span className="count-recovered">{this.props.recoveredTotal.toLocaleString('en-IN')}</span>
                            <span className="label">Recovered</span>
                        </div>
                    </div>
                    <div className="col-md-4 mb-5">
                        <div className="tile">
                            <span className="count-deceased">{this.props.deceasedTotal.toLocaleString('en-IN')}</span>
                            <span className="label">Deaths</span>
                        </div>
                    </div>
                </section>
                <section className="row my-5">
                    <div id="b_chart_wrapper" className="col-12">
                        <BarChart page="home" data={DATA} />
                    </div>
                </section>
                <section className="row my-5 justify-content-center">
                    <div className="col-12 col-md-8 search-input">
                        <input id="search_state" placeholder="Search states..." value={this.state.search} onChange={(e) => this.setState({search : e.target.value})} />
                        <i class="fa fa-search fa-lg"></i>
                    </div>
                </section>
                <section className="row mb-5 justify-content-center">
                    {Object.keys(DATA).length === 0 ? null :
                    Object.keys(DATA).map(key =>
                        DATA[key].statename.toLowerCase().includes(this.state.search.toLowerCase()) ?
                        <span key={key} className="state-tag" onClick={() => this.props.history.push(`state/${key}`)}>{DATA[key].statename}</span> : null
                    )}
                </section>
            </main>
        );
    }
}

export default Home;