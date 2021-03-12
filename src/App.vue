<template>
  <v-app id="app">
    <Appbar
      @toggle="toggleDrawer"
      app
    />
    <v-app-bar-title>{{ ruleSet['name'] }}</v-app-bar-title>
    <ActionsDrawer
      :show="drawer"
      @toggle="toggleDrawer"
      @setRuleSet="setRuleSet"
      app
    />
    <v-main v-if="isValid">
      <v-container
        padding="10px"
        light
      >
        <v-tabs
          v-model="tab"
          align-with-title
          grow
        >
          <v-tabs-slider color="blue" />
          <v-tab
            v-for="(value, key) in ruleSetKeys"
            :key="key"
          >
            {{ key }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="(value, key) in ruleSetKeys"
            :key="key"
          >
            <v-container fluid>
              <v-row
                align="center"
                v-for="val in value"
                :key="val && val.name ? val.name : null"
              >
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    label="Field Name"
                    :value="val.name"
                  />
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  v-for="predicateChoices in choices[key]"
                  :key="predicateChoices ? predicateChoices.key+val.name : null"
                >
                  <v-select
                    :items="predicateChoices ? predicateChoices.choices : null"
                    :label="val.name"
                    outlined
                    :value="val.type"
                    single-line
                    hint="Select the Field Type"
                    persistent-hint
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from '@/ui/components/Appbar';
import ActionsDrawer from '@/ui/components/ActionsDrawer';
import choices from '@/constants/choices';

export default {
	components: {
	  Appbar,
		ActionsDrawer,
	},
	data: () => ({
		drawer: false,
		group: null,
		tab: null,
		menus: [
			{ Open: 'openJson' },
		],
		choices,
		fileToImport: null,
		ruleSet: {
			name: 'test',
			attributes: [
				{
					name: 'TEst',
					type: 'number',
				},
			],
			decisions: [
				{
					conditions: {
						all: [
							{
								fact: 'TEst',
								operator: 'equal',
								value: 2,
							},
						],
					},
					event: {
						type: 'IsFine',
						params: {
							'': '',
						},
					},
				},
			],
		},
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
	    console.log(Object.keys(this.ruleSet));
			const res = Object.keys(this.ruleSet).filter(i => i !== 'name').reduce((a, c) => {
				a[c] = this.ruleSet[c];
				return a;
			},
			{});
			console.log(res);
			return res;
		},
	},
	methods: {
		setRuleSet(ruleSet) {
			this.ruleSet = JSON.parse(ruleSet);
			console.log(ruleSet);
		},
		toggleDrawer() {
			this.drawer = !this.drawer;
		},
	},
};
</script>
