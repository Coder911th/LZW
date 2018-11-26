<template>
  <div id="app">
    <header>
      Data compression method - LZW
    </header>
    <form-item text="Input">
      <file-dialog
        v-model="inputPath"
        type="open"
      />
    </form-item>
    <form-item text="Output">
      <file-dialog
        v-model="outputPath"
        type="save"
      />
    </form-item>
    <form-item text="Dictionary">
      <file-dialog
        v-model="dictionaryPath"
        type="open"
      />
    </form-item>
    <row jc="center">
      <named-switch
        leftText="Encode"
        rightText="Decode"
        borderRadius="5"
        v-model="switchState"
      />
    </row>
    <row jc="center">
      <transition
        name="fade"
        mode="out-in"
      >
        <base-button
          v-if="!computing"
          text="Start"
          @click="start"
        />
        <loading v-else/>
      </transition>
    </row>
    <div id="signature">Lozhkin Dmitry, 2018</div>
  </div>
</template>

<script>
import TextBoxWithButton from './components/TextBoxWithButton'
import FormItem from './components/FormItem'
import NamedSwitch from './components/NamedSwitch'
import BaseButton from './components/BaseButton'
import Row from './components/Row'
import Loading from './components/Loading'
import FileDialog from './components/FileDialog'
import lzw from './../static/js/lzw.js'

const fs = window.require('fs')

export default {
  name: 'App',
  data() {
    return {
      inputPath: '',
      outputPath: '',
      dictionaryPath: '',
      switchState: 'left',
      computing: false
    }
  },
  methods: {
    abort(message) {
      this.computing = false;
      alert(message);
    },
    start() {
      fs.readFile(this.inputPath, (err, data) => {
        if (err) {
          return this.abort('Failed to open the input file!');
        }
        data = data.toString();
        fs.readFile(this.dictionaryPath, (err, dictText) => {
          if (err) {
            this.computing = false;
            return this.abort('Failed to open the dictionary file!');
          }
          this.computing = true;
          dictText = dictText.toString();

          // Первичная обработка словаря
          let dict = dictText.split('#\n');
          let result;
          if (this.switchState == 'left') {
            // Проверяем, что в кодируемом тексте содержатся только символы алфавита
            if ([...data].some(s => dict.indexOf(s) == -1)) {
              return this.abort('The input file contains a character that is not in the dictionary!');
            }
            // Кодируем
            result = lzw.encode(data, dict).join('\r\n');
          } else {
            // Декодируем
            result = lzw.decode(data.split('\n').map(code => code.trim()), dict);
          }
          fs.writeFile(this.outputPath, new Buffer(result), err => {
            this.abort(err ? 'Failed to open the output file! ' : 'Mission Completed!');
          });
        });
      })
    }
  },
  components: {
    TextBoxWithButton,
    FormItem,
    NamedSwitch,
    BaseButton,
    Row,
    Loading,
    FileDialog
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Indie+Flower');
@import url('https://fonts.googleapis.com/css?family=Shadows+Into+Light');
@import url('https://fonts.googleapis.com/css?family=Cinzel:700');

* {
  color: #333;
}

html,
input,
button {
  letter-spacing: 1px;
  font-family: Arial;
}

body {
  max-width: 400px;
  min-height: 100vh;

  margin: 0 auto;
  user-select: none;
  overflow: hidden;
}

#app {
  input {
    background: #fff;

    &:disabled {
      background: #f0f0f0;
    }
  }

  header {
    padding: 15px;
    margin: 0 -200px 10px;
    
    color: #333;
    font: 36px 'Indie Flower';
    text-align: center;
  }

  .form-item {
    margin-bottom: 10px;

    .title {
      font: .8rem 'Arial';
    }
  }

  .text-box-with-button {
    .button {
      background: #fff;

      &:hover {
        background: #000;
        box-shadow: inset 0 0 50px rgb(10, 145, 10);
        color: #fff;
      }
    }
  }

  .row {
    margin: 40px 0;
  }

  .base-button {
    transition: 1s;

    padding: 10px 50px;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .5);

    font: 24px 'Cinzel';

    &:hover {
      animation: shake .5s linear 2;

      border: none;
      box-shadow: 0 0 10px rgb(71, 145, 71),
        inset 0 0 80px rgb(10, 145, 10);
    }
  }

  .named-switch {
    box-shadow: 0 0 10px rgba(0, 0, 0, .75);

    .button {
      transition: .3s;
      border: none;
      background: rgb(1, 58, 1);
      color: #fff;
    }

    .active {
      box-shadow: inset 0 0 50px rgb(10, 145, 10);
    }
  }

  .loading {
    margin-top: -25px;
  }

  /* Анимация исчезновения */
  .fade-enter-active,
  .fade-leave-active {
    animation: none;
    transition: .7s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}

/* Анимация встряски */
@keyframes shake {
  from {
    transform: rotate(0);
  }

  25% {
    transform: rotate(-15deg);
  }

  75% {
    transform: rotate(15deg);
  }

  to {
    transform: rotate(0);
  }
}

#signature {
  position: fixed;
  right: 5px;
  bottom: 5px;
  
  letter-spacing: 1px;
  font-variant: small-caps;

  opacity: .5;
}
</style>
