<template>
  <div>
    <section class="row justify-content-center">
      <div class="col-md-9">
        <div>
          <p id="p-text" style="font-size: 13px">
            Para oferecer as melhores opções, precisamos de mais detalhes!
          </p>
        </div>

        <a-form :model="localPreference.preference" @finish="handleButton">
          <div class="input-space">
            <label>Qual é a localização desejada para o imóvel?</label>
            <a-form-item :validateStatus="status.location" :help="text.location" required>
              <a-select
                placeholder="Selecione um local"
                v-model:value="localPreference.preference.location"
              >
                <a-select-option v-for="(value, key) in district" :key="key" :value="key">
                  {{ value }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              :validateStatus="status.locationOther"
              :help="text.locationOther"
              v-if="localPreference.preference.location === 'Other'"
            >
              <a-input
                placeholder="Que outro lugar você procura?"
                v-model:value="localPreference.preference.locationOther"
              >
              </a-input>
            </a-form-item>
          </div>

          <div class="input-space">
            <label>Qual é o tipo de imóvel que você está procurando?</label>
            <a-form-item :validateStatus="status.immobile" :help="text.immobile" required>
              <a-radio-group v-model:value="localPreference.preference.immobile">
                <a-radio value="apartament">Apartamento</a-radio>
                <a-radio value="house">Casa</a-radio>
                <a-radio value="commercial">Comercial</a-radio>
                <a-radio value="lote">Lote</a-radio>
              </a-radio-group>
            </a-form-item>
          </div>

          <div class="input-space">
            <label>Até quanto está disposto a investir no imóvel?</label>
            <a-form-item :validateStatus="status.price" :help="text.price" required>
              <a-select
                placeholder="Selecione um valor"
                v-model:value="localPreference.preference.price"
              >
                <a-select-option v-for="(value, key) in prices" :key="key" :value="key">
                  {{ value }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>

          <div class="btn-continue" style="text-align: center">
            <a-button style="margin-right: 10px" type="primary" @click="handleBack"
              >Voltar</a-button
            >
            <a-button type="primary" html-type="submit">Continue</a-button>
          </div>
        </a-form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, defineProps, defineEmits, watch } from 'vue'

const props = defineProps(['formState', 'preferenceText', 'preferenceStatus'])
const emit = defineEmits(['update:activeKey'])

const status = reactive({ ...props.preferenceStatus })
const text = reactive({ ...props.preferenceText })
const localPreference = reactive({ ...props.formState })

const district = {
  Atalaia: 'Atalaia',
  Barra: 'Barra dos Coqueiros',
  Luzia: 'Luzia',
  Grageru: 'Grageru',
  Aruana: 'Aruana',
  Jardins: 'Jardins',
  Farolandia: 'Farolândia',
  Coroa: 'Coroa do Meio',
  Other: 'Outro'
}

watch(localPreference.preference, () => {
  status.immobile = ''
  status.location = ''
  status.locationOther = ''
  status.price = ''
  text.immobile = ''
  text.location = ''
  text.locationOther = ''
  text.price = ''
})

const prices = {
  one: 'Entre R$150 mil e R$250 mil',
  two: 'Entre R$250 mil e R$350 mil',
  three: 'Entre R$350 mil e R$450 mil',
  four: 'Entre R$550 mil e R$600 mil',
  five: 'Menos que R$150 mil',
  six: 'Mais que R$600 mil'
}

const validateField = (fieldName) => {
  const value = localPreference.preference[fieldName]
  const validation = { valid: true, message: '' }

  if (!value) {
    validation.valid = false
    validation.message = 'Preencha esse campo.'
    status[fieldName] = 'error'
  } else if (localPreference.preference.location === 'Other') {
    validation.valid = false
    validation.message = 'Preencha esse campo.'
    status[fieldName] = 'error'
  } else {
    status[fieldName] = ''
  }

  text[fieldName] = validation.message

  return validation
}

const handleButton = async () => {
  const validImmobile = validateField('immobile')
  const validLocation = validateField('location')
  const validPrice = validateField('price')

  if (validImmobile.valid && validLocation.valid && validPrice.valid) {
    emit('update:activeKey', '3')
  }
}

const handleBack = async () => {
  emit('update:activeKey', '1')
}
</script>
