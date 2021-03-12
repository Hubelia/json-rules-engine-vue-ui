<template>
  <v-app-bar
    color="blue-grey"
    dark
    app
    dense
  >
    <v-app-bar-nav-icon @click="toggleDrawer" />

    <v-toolbar-title>Logic Editor</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
	name: 'Appbar',
	computed: {

	},
	methods: {
		toggleDrawer() {
			this.$emit('toggle');
		},
	},
};
</script>
