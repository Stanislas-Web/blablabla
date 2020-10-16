import React from 'react';
import 'assets/css/TheContainer.scss'
import ContainerChart from 'containers/ContainerChart';
// import Amchart1 from 'components/graphiques/Amchart1';
import Amchart2 from 'components/graphiques/Amchart2';
import Amchart3 from 'components/graphiques/Amchart3';
import TheArticle from 'containers/TheArticle';

const Container = () => {
    return ( <div className="parent">
                    <div className="enfant">
                        <ContainerChart content={<Amchart3/>}/> <br/>
                        <ContainerChart content={<Amchart2/>}/>
                    </div>
                    <div className="enfant">
                        <ContainerChart content={<TheArticle/>} />   
                    </div>
            </div> );
}
 
export default Container;

