import React from 'react';
import Article from 'components/Article';
import 'assets/css/TheArticle.scss';

const TheArticle = () => {
    return ( <div className="grandParentArticle">
                        <h3>Top des nouvelles pour les violences en RDC</h3>
                    <Article/>
                    <Article/>
                    <Article/>
                    <br/>
                    <p className="plusNouvelles">Plus de nouvelles</p>

            </div> );
}
 
export default TheArticle;