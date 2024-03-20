<template>
  <div>
    <section class="row justify-content-center">
      <div class="col-md-9">
        <div>
          <p id="p-text" style="font-size: 13px">
            Por fim, se puder nos diga sobre a sua experiência!
          </p>
        </div>

        <a-form :model="localExtra.extra" @finish="handleButton">
          <div class="input-space">
            <label>Como você conheceu a imobiliária?</label>
            <a-form-item :validateStatus="status.metImmobile" :help="text.metImmobile" required>
              <a-select placeholder="Selecione" v-model:value="localExtra.extra.metImmobile">
                <a-select-option v-for="(value, key) in knowImmobile" :key="key" :value="key">
                  {{ value }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>

          <div class="input-space">
            <label>Qual o melhor horário para entrarmos em contato com você?</label>
            <a-form-item :validateStatus="status.time" :help="text.time" required>
              <a-radio-group v-model:value="localExtra.extra.time">
                <a-radio value="morning">Manhã</a-radio>
                <a-radio value="afternoon">Tarde</a-radio>
                <a-radio value="night">Noite</a-radio>
                <a-radio value="weekend">Aos finais de semana</a-radio>
              </a-radio-group>
            </a-form-item>
          </div>

          <div class="input-space">
            <label
              >Alguma informação adicional que gostaria de compartilhar ou dúvidas que gostaria de
              esclarecer?</label
            >
            <a-form-item :validateStatus="status.addInfo" :help="text.addInfo" required>
              <a-input
                placeholder="Que informação seria?"
                v-model:value="localExtra.extra.addInfo"
              ></a-input>
            </a-form-item>
          </div>

          <div class="btn-continue" style="text-align: center">
            <a-button style="margin-right: 10px" class="mr-5" type="primary" @click="handleBack"
              >Voltar</a-button
            >
            <a-button type="primary" html-type="submit">Enviar</a-button>
          </div>
        </a-form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, defineProps, defineEmits } from 'vue'

const props = defineProps(['formState', 'finallyForm', 'extraText', 'extraStatus', 'loading'])
const emit = defineEmits(['update:activeKey', 'update:permissionOkAddInfo'])

const status = reactive({ ...props.extraStatus })
const text = reactive({ ...props.extraText })
const localExtra = reactive({ ...props.formState })

const knowImmobile = {
  ads: 'Anúncio',
  social: 'Rede Social',
  search: 'Pesquisa na Internet',
  peoples: 'Indicação de Conhecidos'
}

const handleButton = async () => {
  props
    .finallyForm()
    .then(({ data }) => {
      window.location.pathname = '/success-form'
      console.log(`Informações enviadas: ${data}`)
    })
    .catch((error) => {
      console.error(`Deu erro ${error}`)
    })
}

const handleBack = async () => {
  emit('update:activeKey', '2')
}
</script>
