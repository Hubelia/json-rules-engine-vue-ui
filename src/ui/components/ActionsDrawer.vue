<template>
  <v-navigation-drawer
    absolute
    temporary
    app
    v-model="drawer"
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
</template>

<script>
export default {
	name: 'ActionsDrawer',
	data: () => ({
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
	props: { show: { type: Boolean } },
	computed: {
		drawer: {
			get() {
				return this.show;
			},
			set(value) {
			  if (!value) {
					return this.$emit('toggle');
				}
			},
		},
	},
	methods: {
		openJson() {
			if (!this.fileToImport) {
				return this.openAlert('Please make sure to upload a JSON file.');
			}
			const reader = new FileReader();
			const self = this;
			reader.onload = () => {
				self.$emit('setRuleSet', reader.result);
				self.$emit('toggle');
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
			return file;
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

<style scoped>

</style>
