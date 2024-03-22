import { message } from 'ant-design-vue'

export const Modal = (type, content) => {
  switch (type) {
    case 'success':
      message.success(content)
      break

    case 'warning':
      message.warning(content)
      break

    case 'error':
      message.error(content)
      break

    case 'info':
      message.info(content)
      break
  }
}

export default Modal
