import HomeIndex from "../pages/home/homeIndex";

import NewsPage from '../pages/news/news.jsx';
import NewsListPage from '../pages/news/newsList.jsx';
import NewsDetailPage from '../pages/news/newsDetail';

import ShopPage from '../pages/shop/shop';
import ShopCatePage from '../pages/shop/shopCate';
import ShopListProductPage from '../pages/shop/shopListProduct';
import ShopListServicePage from '../pages/shop/shopListService';
import ShopDetailPage from '../pages/shop/shopDetail';
import ShopPayPage from '../pages/shop/shopPay';
import ShopPayInfoPage from '../pages/shop/ShopPayInfo';
import ShopPaySuccessPage from '../pages/shop/shopPaySuccess';

import MapsPage from '../pages/maps/maps';

import LoginPage from '../pages/user/login';
import RegistrationPage from '../pages/user/registration';
import NotificationPage from '../pages/user/Notification';
import ProfilePage from '../pages/user/profile';
import DetailProfilePage from '../pages/user/DetailProfile';
import CardServicePage from '../pages/user/cardService'; //Thẻ dịch vụ
import SchedulePage from '../pages/user/Schedule'; //Đặt lịch
import ScheduleManagePage from '../pages/user/SchedulesManage'; // Quản lí đặt lịch
import VoucherPage from '../pages/user/voucher'; // Mã giảm giá
import WalletPage from '../pages/user/Wallet'; // Ví điện tử
import DiaryPage from '../pages/user/Diary'; // Nhật ký
import RatingListPage from '../pages/user/RatingList';
import BarCodePage from '../pages/user/userBarcode';
import OrderPage from '../pages/user/userOrder';
import EditEmailPage from '../pages/user/editEmail';
import EditPasswordPage from '../pages/user/editPassword';

//Employee - Nhân viên

import EmployeeServicePage from "../pages/employee/timeKeeping/employeeService";
import EmployeeServiceDetailPage from "../pages/employee/timeKeeping/employeeServiceDetail";
import EmployeeServiceDiaryPage from "../pages/employee/timeKeeping/employeeServiceDiary";
import EmployeeServiceSchedulePage from "../pages/employee/timeKeeping/employeeServiceSchedule";
import EmployeeStatisticalPage from "../pages/employee/statistical/employeeStatistical";
import EmployeeReportPage from "../pages/employee/report/employeeReport";

import SearchPage from "../pages/search/index";
import NotFoundPage from '../pages/404.jsx';
import { getUser } from "../constants/user";

function checkAuth(to, from, resolve, reject) {
    var router = this;
    if (getUser()) {
        resolve();
    } else {
        reject();
        router.navigate('/login/');
    }
}

const checkRouterHome = () => {

    const infoUser = getUser();

    const ACC_TYPE = infoUser && infoUser.acc_type;
    if (ACC_TYPE === "M") {
        return HomeIndex;
    }

    if (ACC_TYPE === "U") {
        if (infoUser.ID === 1) {
            return EmployeeReportPage;
        } else {
            const groupRole = infoUser.GroupTitles;
            if (groupRole.includes("service")) {
                return EmployeeServicePage;
            } else if (groupRole.includes("director")) {
                return EmployeeReportPage;
            } else {
                return EmployeeStatisticalPage;
            }
        }
    }
    return HomeIndex;
}

var routes = [{
        path: '/',
        asyncComponent: () => checkRouterHome(),
    },
    {
        path: '/news/',
        asyncComponent: () => HomeIndex,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/news-list/',
        asyncComponent: () => NewsListPage,
    },
    {
        path: '/news/detail/:postId/',
        asyncComponent: () => NewsDetailPage,
    },
    {
        path: '/shop/',
        asyncComponent: () => ShopPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/pay/',
        component: ShopPayPage,
        beforeEnter: checkAuth
    },
    {
        path: '/pay-info/',
        asyncComponent: () => ShopPayInfoPage
    },
    {
        path: '/pay-success/:orderID',
        component: ShopPaySuccessPage
    },
    {
        path: '/shop/:cateId',
        async(routeTo, routeFrom, resolve, reject) {
            const cateID = routeTo.params.cateId;
            if (cateID === "hot") {
                resolve({
                    component: ShopListProductPage,
                });
            } else {
                resolve({
                    component: ShopCatePage,

                });
            }
        }
    },
    {
        path: '/shop/list/:parentId/:cateId',
        async(routeTo, routeFrom, resolve, reject) {
            const cateParentID = routeTo.params.parentId;
            if (cateParentID === "795") {
                resolve({
                    component: ShopListServicePage,
                });
            } else {
                resolve({
                    component: ShopListProductPage,
                });
            }
        }
        //component: ShopListPage,
    },
    {
        path: '/shop/detail/:cateId',
        async(routeTo, routeFrom, resolve, reject) {},
        asyncComponent: () => ShopDetailPage,
    },
    {
        path: '/maps/',
        asyncComponent: () => MapsPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/login/',
        asyncComponent: () => LoginPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/registration/',
        asyncComponent: () => RegistrationPage,
        options: {
            transition: 'f7-cover-v',
        }
    },
    {
        path: '/profile/',
        asyncComponent: () => ProfilePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/detail-profile/',
        asyncComponent: () => DetailProfilePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/edit-email/',
        asyncComponent: () => EditEmailPage
    },
    {
        path: '/edit-password/',
        asyncComponent: () => EditPasswordPage
    },
    {
        path: '/cardservice/', // Thẻ dịch vụ
        asyncComponent: () => CardServicePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/schedule/', // Thẻ dịch vụ
        asyncComponent: () => SchedulePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/manage-schedules/', // Quản lý Thẻ dịch vụ
        asyncComponent: () => ScheduleManagePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/barcode/', // Check In
        asyncComponent: () => BarCodePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/order/', // Check In
        asyncComponent: () => OrderPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/voucher/', // Mã giảm giá
        asyncComponent: () => VoucherPage
    },
    {
        path: '/wallet/', // Ví điện tử
        asyncComponent: () => WalletPage
    },
    {
        path: '/diary/', // Nhật ký
        asyncComponent: () => DiaryPage
    },
    {
        path: '/rating/', // Nhật ký
        asyncComponent: () => RatingListPage
    },
    {
        path: '/notification/', // Thông báo Noti
        asyncComponent: () => NotificationPage,
        beforeEnter: checkAuth
    },
    {
        path: '/employee/service/', // Nhân viên dịch vụ
        asyncComponent: () => EmployeeServicePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/employee/service/:id/', // Nhân viên dịch vụ chi tiết
        asyncComponent: () => EmployeeServiceDetailPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/employee/diary/:id/', // Nhân viên nhật ký
        asyncComponent: () => EmployeeServiceDiaryPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/employee/schedule/:orderItem/', // Nhân viên lịch trình
        asyncComponent: () => EmployeeServiceSchedulePage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/employee/statistical/', // Thống kê
        asyncComponent: () => EmployeeStatisticalPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/employee/report/', // Thống kê
        asyncComponent: () => EmployeeReportPage,
        options: {
            transition: 'f7-cover',
        }
    },
    {
        path: '/search/', // Thống kê
        asyncComponent: () => SearchPage,
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];

export default routes;