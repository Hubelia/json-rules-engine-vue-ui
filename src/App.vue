<template>
  <v-app id="app">
    <v-app-bar
      color="blue-grey"
      dark
      app
      dense
    >
      <v-app-bar-nav-icon @click="drawer = true" />

      <v-toolbar-title>Logic Editor</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      app
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="blue-grey--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-arrow-up-bold</v-icon>
            </v-list-item-icon>
            <v-dialog
              persistent
              transition="dialog-top-transition"
              max-width="600"
            >
              <template #activator="{ on, attrs }">
                <v-list-item-title
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  Upload
                </v-list-item-title>
              </template>
              <template #default="dialog">
                <v-card>
                  <v-toolbar
                    color="primary"
                    dark
                  >
                    Please select a JSON File
                  </v-toolbar>
                  <v-card-text>
                    <div class="text-h2 pa-12">
                      <v-file-input
                        accept="application/json"
                        label="Select JSON File"
                        @change="selectFile"
                      />
                    </div>
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <v-btn
                      text
                      @click="openJson"
                    >
                      Import
                    </v-btn>
                    <v-btn
                      text
                      @click="dialog.value = false"
                    >
                      Close
                    </v-btn>
                  </v-card-actions>
                  <v-alert
                    :value="alert.opened"
                    color="pink"
                    dark
                    border="top"
                    icon="mdi-home"
                    transition="scale-transition"
                  >
                    {{ alert.message }}
                    <v-btn
                      color="primary"
                      @click="resetAlert"
                    >
                      Ok
                    </v-btn>
                  </v-alert>
                </v-card>
              </template>
            </v-dialog>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-arrow-down-bold</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Export</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          Upload
        </v-btn>
      </template>
    </v-navigation-drawer>
    <v-main v-if="isValid">
      <v-container
        padding="10px"
        light
      >
        <v-row>{{ ruleSet['name'] }}</v-row>
        <v-row
          v-for="(value, key) in ruleSetKeys"
          :key="key"
        >
          <v-card
            height="200"
            width="80%"
            cols="4"
          >
            {{ key }}
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
	data: () => ({
		drawer: false,
		group: null,
		menus: [
			{ Open: 'openJson' },
		],
		fileToImport: null,
		ruleSet: {},
		alert: {
		  message: '',
			opened: false,
		},
	}),
	computed: {
	  isValid() {
	    const { ruleSet } = this;
	    console.log(ruleSet);
	    return Object.keys(ruleSet).length > 0;
		},
		ruleSetKeys() {
			return Object.keys(this.ruleSet).filter(i => i !== 'name').reduce((a, c) => {
				a[c] = this.ruleSet[c];
				return a;
			},
			{});
		},
	},
	methods: {
	  openJson() {
			this.drawer = false;
	    if (!this.fileToImport) {
				return this.openAlert('Please make sure to upload a JSON file.');
			}
			const reader = new FileReader();
			console.log('OpeningJSON', this.fileToImport);
			const self = this;
			reader.onload = () => {
				self.ruleSet = JSON.parse(reader.result);
			};
			reader.readAsText(this.fileToImport);
			this.resetAlert();
		},
		selectFile(file) {
	    if (!file || file.type !== 'application/json') {
				this.fileToImport = null;
	      return this.openAlert('Please make sure to upload a JSON file.');
			}
	    this.resetAlert();
			this.fileToImport = file;
		},
		openAlert(message) {
			this.alert.opened = true;
			this.alert.message = message || '';
		},
		resetAlert() {
			this.alert.opened = false;
			this.alert.message = '';
		},
	},
};
</script>
