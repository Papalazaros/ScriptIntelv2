import Vue from 'vue';
import Router from 'vue-router';
import Unauthorized from '@/components/Unauthorized';
import Home from '@/components/Home';
import Admin from '@/components/Admin';
import PharmacyAnalytics from '@/components/PharmacyAnalytics';
import Auth from '@okta/okta-vue';
import Analytics from '@/components/Analytics';
import ActiveScripts from '@/components/ActiveScripts';
import ProfitLossAnalytics from '@/components/ProfitLossAnalytics';

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
			path: '/analytics',
			name: 'Analytics',
			component: Analytics,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/activescripts',
			name: 'ActiveScripts',
			component: ActiveScripts,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/profitlossanalytics',
			name: 'ProfitLossAnalytics',
			component: ProfitLossAnalytics,
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
	} else {
		next();
	}
};

router.beforeEach(checkRoute);
export default router;