<template>
  <Page>
    <ScrollView>
      <StackLayout>
        <Image margin="0" src="~/assets/images/securestorage.png" width="100%"></Image>

        <Button text="Set a value, sync" @tap="doSetSync" class="button-a button-group-first"></Button>
        <Button text="Set a value, async" @tap="doSet" class="button-a"></Button>

        <Button text="Get a value, sync" @tap="doGetSync" class="button-b button-group-first"></Button>
        <Button text="Get a value, async" @tap="doGet" class="button-b"></Button>

        <Label :text="lastRetrievedValue" class="message" textWrap="true"></Label>

        <Button text="Remove a value, sync" @tap="doRemoveSync" class="button-c"></Button>
        <Button text="Remove a value, async" @tap="doRemove" class="button-c"></Button>

        <Button text="Remove all values, sync" @tap="doRemoveAllSync" class="button-d button-group-first"></Button>
        <Button text="Remove all values, async" @tap="doRemoveAll" class="button-d"></Button>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
  import { SecureStorage } from "@nativescript/secure-storage";

  const secureStorage = new SecureStorage();

  export default {
    data() {
      return {
        lastRetrievedValue: ""
      };
    },

    methods: {
      doSetSync() {
        const success = secureStorage.setSync({
          key: "foo",
          value: "I was set at " + new Date()
        });
        console.log("Successfully set a value? " + success);
      },

      doSet() {
        secureStorage.set({
          key: "foo",
          value: "I was set at " + new Date()
        }).then(success => {
          console.log("Successfully set a value? " + success);
        }, (err) => {
          console.log(err);
        });
      },

      doGet() {
        secureStorage.get({
          key: "foo"
        }).then(value => {
          console.log("Value: " + value);
          this.lastRetrievedValue = value === null ? "(no value set)" : value;
        }, (err) => {
          console.log(err);
        });
      },

      doGetSync() {
        const value = secureStorage.getSync({
          key: "foo"
        });
        this.lastRetrievedValue = value === null ? "(no value set)" : value;
      },

      doRemove() {
        secureStorage.remove({
          key: "foo"
        }).then(success => {
          console.log("Successfully removed a value? " + success);
          this.lastRetrievedValue = "";
        }, (err) => {
          console.log(err);
        });
      },

      doRemoveSync() {
        secureStorage.removeSync({
          key: "foo"
        });
        this.lastRetrievedValue = "";
      },

      doRemoveAll() {
        secureStorage.removeAll().then(success => {
          console.log("Successfully removed all values? " + success);
          this.lastRetrievedValue = "";
        }, (err) => {
          console.log(err);
        });
      },

      doRemoveAllSync() {
        secureStorage.removeAllSync();
        this.lastRetrievedValue = "";
      }
    }
  };
</script>

<style scoped>
  .message {
    color: #666;
    font-size: 16;
    padding: 20;
  }

  button {
    color: #ffffff;
    background-color: #6494AA;
    padding: 6;
    margin: 8 24;
    font-size: 14;
    border-radius: 4;
  }

  .button-group-first {
    margin-top: 24;
  }

  .button-a {
    background-color: cornflowerblue;
  }

  .button-b {
    background-color: forestgreen;
  }

  .button-c {
    background-color: orange;
  }

  .button-d {
    background-color: red;
  }
</style>
