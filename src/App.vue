<template>
  <v-app>    
    <v-navigation-drawer width="250px" fixed clipped app class="navigation" v-model="drawer" v-if="activeUser">
      <v-list class="navigation">
        <template v-for="heading in headings">
          <v-layout row :key="heading.to" class="navigation-row">
            <v-flex xs12>
              <v-list-tile :to="heading.to" exact>
                <v-list-tile-content class="main-heading-row">
                  <v-list-tile-title class="main-heading">
                    {{ heading.title }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>              
              <template v-if="heading.subHeadings" v-for="subHeading in heading.subHeadings">
                <v-list-tile :to="subHeading.to" exact :key="subHeading.id" class="sub-heading">
                  <v-list-tile-content class="sub-content">
                    <v-list-tile-title class="sub-heading">
                      {{ subHeading.title }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-flex>
          </v-layout>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app clipped-left>
      <v-toolbar-side-icon v-if="activeUser" @click.native="drawer = !drawer"><v-icon color="white">menu</v-icon></v-toolbar-side-icon>
        <v-toolbar-title class="title-text">
          <router-link to="/" exact><span>ScriptIntel</span></router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="success" @click.prevent="login" v-if="!activeUser"><span>Login</span></v-btn>
      <v-menu v-if="activeUser" >        
        <v-btn class="profile-btn" flat fab slot="activator"><v-icon color="#E1E4E3">person</v-icon></v-btn>
        <v-list class="navigation user-menu">
          <v-layout column justify-center align-center>
            <v-list-tile class="user-menu-list" v-for="item in user_menu" :to="item.to" :key="item.to">
              <v-list-tile-content>
                <v-list-tile-title class="text-xs-center">{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="user-menu-list" v-if="this.activeUser.isAdmin" to="/admin">
              <v-list-tile-content>
                <v-list-tile-title class="text-xs-center">Admin</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="user-menu-list-logout" to="/">
              <v-list-tile-content v-if="activeUser" @click.prevent="logout">
                <v-list-tile-title class="text-xs-center logout">Logout</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-layout>
        </v-list>
      </v-menu>
    </v-toolbar>
    <ErrorNotifier class="error-notifier"/>
    <v-content>      
      <router-view :key="$route.fullPath"/>
    </v-content>
  </v-app>
</template>

<script>
import api from '@/api';
import ErrorNotifier from './components/ErrorNotifier'

export default {
  name: 'App',
  components: {
    ErrorNotifier
  },
  computed : {
    pharmaciesForSelection() {
      return this.$store.getters.pharmaciesForSelection;
    }
  },
  data () {
    return {
      drawer: null,
      user_menu: [
        { title: "Profile", to: "/profile" },
        { title: "Settings", to: "/settings" }
      ],
      headings: [
        {
          title: "Pharmacy Analytics",
          to: "/pharmacyanalytics",
          subHeadings: null
        },
        {
          title: "Pharmacy Comparison",
          to: "/pharmacycomparison",
          subHeadings: null
        },        
        {
          title: "SI Class Explorer",
          to: "/classexplorer",
          subHeadings: null
        },
        {
          title: "Optimization Plans",
          to: "opt",
          subHeadings: null
        },                
        {
          title: "Pharmacies",
          to: "pha",
          subHeadings: null
        }
      ],
      activeUser: null
    }
  },
  async created () {
    this.$store.dispatch('updatePharmaciesForSelection');
    await this.refreshActiveUser()
  },
  watch: {
    '$route': 'refreshActiveUser',
    pharmaciesForSelection: function (val) {
      this.headings[0].subHeadings = val.map(pharmacy => ({ id: pharmacy.pharmacyId, title: pharmacy.pharmacyName, to: "/pharmacyanalytics/" + pharmacy.pharmacyId }))
    }
  },
  methods: {
    login () {
      this.$auth.loginRedirect()
    },
    async refreshActiveUser () {
      this.activeUser = await this.$auth.getUser()
    },
    async logout () {
      this.$store.replaceState({})
      await this.$auth.logout()
      await this.refreshActiveUser()
      this.$router.push('/')
    }
  }
}
</script>
<style>
.error-notifier {
  position: absolute;
  z-index: 9;
  height: 50px;
  right: 75px;
  pointer-events: none;
}
.container {
  padding: 5px 5px;
}
.logout {
  color: red!important;
}
.v-toolbar {
  background-color: #1C2B32!important;
  color: white!important;
}
.profile-btn {
  width: 50px;
  height: 50px;
}
.navigation {
  color: white!important;
  background-color: #1C2B32!important;
  padding: 0px 0px;
}
.navigation-row {
  margin: 10px 10px;
  border-top: solid 1px white;
  border-bottom: solid 1px white;
}
.main-heading {
  font-size: 16px;
}
.sub-content {
  margin: 0px 0px 0px 15px;
  border-top: solid 1px #E1E4E3;
}
.title-text a {
  text-decoration: none;
  color: white;
}
.user-menu {
  border: solid 2.5px #E1E4E3;
}
.user-menu-list, .user-menu-list-logout {
  width: 175px;
}
.v-list__tile {
  padding: 0px 0px;
}
.v-list__tile--active .v-list__tile__title {
  color: black!important;
}
.v-list__tile--active, .v-list__tile--active .v-list__tile__title {
  text-decoration: none;
  padding: 0px 15px;
  color: black;
  background-color: #E1E4E3;
}
.v-list__tile--link:hover {
  color: black;
  background-color: #E1E4E3!important;
}
.v-list__tile--link:hover:not(.v-list__tile--active) {
  padding: 0px 10px;
}
</style>