import Vue from 'vue';
import Router from 'vue-router';
import Unauthorized from '@/components/Unauthorized';
import Home from '@/components/Home';
import Admin from '@/components/Admin';
import PharmacyAnalytics from '@/components/PharmacyAnalytics';
import PharmacyComparison from '@/components/PharmacyComparison';
import ClassExplorer from '@/components/ClassExplorer';
import Auth from '@okta/okta-vue';

Vue.use(Auth, {
	issuer: 'https://dev-866259.oktapreview.com/oauth2/default',
	client_id: '0oajeuzoieJ9CjpSh0h7',
	redirect_uri: window.location.origin + '/implicit/callback',
	scope: 'openid profile email'
});

Vue.use(Router);

let router = new Router({
	mode: 'history',
	routes: [{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/admin',
			name: 'Admin',
			component: Admin,
			meta: {
				requiresAuth: true,
				adminOnly: true
			}
		},
		{
			path: '/pharmacyanalytics',
			name: 'PharmacyAnalytics',
			component: PharmacyAnalytics,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/pharmacycomparison',
			name: 'PharmacyComparison',
			component: PharmacyComparison,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/pharmacyanalytics/:pharmacyId',
			name: 'PharmacyAnalytics',
			component: PharmacyAnalytics,
			props: true,
			meta: {
				requiresAuth: true
			}
		},		
		{
			path: '/classexplorer',
			name: 'ClassExplorer',
			component: ClassExplorer,
			meta: {
				requiresAuth: true
			}
		},			
		{
			path: '/unauthorized',
			name: 'Unauthorized',
			component: Unauthorized
		},
		{
			path: '/implicit/callback',
			component: Auth.handleCallback()
		}
	]
});

const checkRoute = async (to, from, next) => {
	Vue.prototype.$auth.authRedirectGuard();
	if (to.meta.adminOnly) {
		var user = await Vue.prototype.$auth.getUser();
		if (!user || !user.isAdmin) {
			next('/unauthorized');
		} else {
			next();
		}
	}
	next();
};

router.beforeEach(checkRoute);
export default router;