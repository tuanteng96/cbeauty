import React from "react";
import BookDataService from "../../../service/book.service";
import { getUser } from "../../../constants/user";
import { SERVER_APP } from "../../../constants/config";
import { formatPriceVietnamese } from "../../../constants/format";
import ServiceCartSkeleton from "./ServiceCartSkeleton";

export default class ServiceCartComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    this.getCardService();
  }

  getCardService = () => {
    const infoUser = getUser();
    if (!infoUser) return false;
    BookDataService.getCardService(infoUser.ID)
      .then((response) => {
        const data = response.data.data.the;
        const arrData = [];
        data.map((item) => {
          const Titles = item.Prod && item.Prod.Title;
          item.Titles = Titles;
          item.isActive = false;
          arrData.push(item);
        });
        this.setState({
          arrCardsv: arrData,
          isLoading: false,
        });
      })
      .catch((er) => console.log(er));
  };

  handleClick = (item) => {
    const { arrCardsv } = this.state;
    const id = item.OrderItemID;
    const index = arrCardsv.findIndex((obj) => obj.OrderItemID === id);
    if (index < 0) return false;
    const isActive = arrCardsv[index].isActive;
    arrCardsv[index].isActive = !isActive;
    this.setState({
      arrCardsv: arrCardsv,
    });

    const arrActive = arrCardsv.filter((item) => item.isActive);
    this.props.handleMultiService(arrActive);
  };

  resetActive = () => {
    const { arrCardsv } = this.state;
    arrCardsv.map((item) => {
      item.isActive = false;
    });
    this.setState({
      arrCardsv: arrCardsv,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { reset } = this.props;

    if (prevProps.reset !== reset) {
      this.resetActive();
    }
  }

  checkNullProd = (prod, service) => {
    if (prod !== null) return prod;
    return service;
  };

  onRefresh = () => {
    this.setState({
      isLoading: true
    })
    this.getCardService();
  };

  render() {
    const { arrCardsv, isLoading } = this.state;
    console.log(arrCardsv);
    return (
      <>
        <h5 onClick={() => this.onRefresh()}>Th??? d???ch v??? c???a b???n</h5>
        <div className="service-me__box">
          <div className="service-me__list">
            {isLoading && <ServiceCartSkeleton />}
            {!isLoading && arrCardsv && arrCardsv.length === 0 ? (
              "B???n kh??ng c?? th??? d???ch v???"
            ) : (
              <>
                {arrCardsv &&
                  arrCardsv.map((item, index) => {
                    if (item.Prod !== null && item.total - item.Done > 0) {
                      return (
                        <div
                          className={`item ${item.isActive ? "active" : ""}`}
                          onClick={() => this.handleClick(item)}
                          key={index}
                        >
                          <div className="item-info">
                            <div className="title">
                              {this.checkNullProd(
                                item.Prod && item.Prod.Title,
                                item.Service.Title
                              )}
                            </div>
                            <div className="count">
                              C??n{" "}
                              <div className="count-number">
                                {item.total - item.Done}
                              </div>
                              bu???i
                            </div>
                            <div className="price">
                              <div className="price-number">
                                {formatPriceVietnamese(item.OrderItemValue)}
                              </div>
                              <div className="price-vnd">VN??</div>
                            </div>
                          </div>
                          <div className="item-image">
                            <img
                              src={
                                SERVER_APP +
                                this.checkNullProd(
                                  item.Prod && item.Prod.Thumbnail_web,
                                  item.Service.Thumbnail_web
                                )
                              }
                              alt={item.Title}
                            />
                          </div>
                        </div>
                      );
                    }
                  })}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
