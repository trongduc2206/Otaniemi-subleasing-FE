import React, { Component } from "react";
import '../styles/itemPage.css';
import mainImage from './image 4.png';

class Item extends Component {
    render() {
      return (
        <>
          <div className="itemPageMainContainer">
            <div className="itemPageCard">
              <div className="itemPageContent">
                <div className="itemPageHeaderSection"></div>
                <img src={ mainImage } />
                <div className="itemPageSubContent">
                  <div className="itemPageSubSubContent">
                    <div className="landlordAndAction"></div>
                    <div className="information">
                      <div className="description">
                        <h3>Description</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam eleifend mi in nulla posuere. Feugiat vivamus at augue eget arcu dictum. Odio tempor orci dapibus ultrices in iaculis nunc. Non blandit massa enim nec dui nunc mattis enim ut. Rhoncus dolor purus non enim praesent elementum facilisis. Purus in massa tempor nec feugiat nisl. Volutpat maecenas volutpat blandit aliquam etiam erat velit. Pellentesque nec nam aliquam sem et tortor consequat id. Eu scelerisque felis imperdiet proin fermentum leo vel.</p>
                        <p>In ante metus dictum at. Sed velit dignissim sodales ut eu sem integer. Facilisis volutpat est velit egestas dui id. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Nulla facilisi nullam vehicula ipsum a arcu cursus. Tellus elementum sagittis vitae et leo. Egestas fringilla phasellus faucibus scelerisque eleifend. Purus non enim praesent elementum facilisis. Dignissim enim sit amet venenatis urna cursus eget nunc scelerisque. Tellus in metus vulputate eu scelerisque felis. Semper quis lectus nulla at volutpat. Facilisi morbi tempus iaculis urna id. Molestie nunc non blandit massa enim nec. Dictum varius duis at consectetur lorem. Amet nisl suscipit adipiscing bibendum est ultricies. Consequat nisl vel pretium lectus quam id. Senectus et netus et malesuada fames ac turpis egestas sed. Libero volutpat sed cras ornare arcu dui vivamus arcu felis.</p> 
                        <p>Id cursus metus aliquam eleifend. Duis at consectetur lorem donec massa. Sed euismod nisi porta lorem mollis aliquam. Donec ultrices tincidunt arcu non sodales. At tellus at urna condimentum mattis. Interdum consectetur libero id faucibus nisl tincidunt eget nullam non. Ullamcorper sit amet risus nullam eget felis eget. Tempor nec feugiat nisl pretium fusce id velit. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Tellus elementum sagittis vitae et. Elementum sagittis vitae et leo duis ut diam quam nulla. Cras semper auctor neque vitae. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Tincidunt dui ut ornare lectus sit amet est. Varius morbi enim nunc faucibus. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean. Quisque egestas diam in arcu cursus euismod. Erat imperdiet sed euismod nisi porta lorem mollis aliquam.</p>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        );
    }
}

export default Item;