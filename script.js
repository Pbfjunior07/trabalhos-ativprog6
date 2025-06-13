document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    const usuarioInput = document.getElementById('usuario'); 
    const senhaInput = document.getElementById('senha');    

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const inputs = form.querySelectorAll('input, select, textarea');
        let camposVazios = [];
        let errosValidacao = [];

        inputs.forEach(input => {
            if (input.type === 'file') {
                if (input.files.length === 0) {
                    const label = document.querySelector(`label[for="${input.id}"]`);
                    camposVazios.push(label ? label.textContent.replace(':', '').trim() : input.id);
                }
            } else if (input.value.trim() === '' || (input.tagName === 'SELECT' && input.value === 'selecione')) {
                const label = document.querySelector(`label[for="${input.id}"]`);
                if (label) {
                    camposVazios.push(label.textContent.replace(':', '').trim());
                } else {
                    camposVazios.push(input.id);
                }
            }
        });

     
        const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (cpfInput && cpfInput.value.trim() !== '' && !cpfPattern.test(cpfInput.value)) {
            errosValidacao.push('CPF (formato esperado: XXX.XXX.XXX-XX)');
        }

        const telefonePattern = /^\(\d{2}\) \d{4}-\d{4}$/;
        if (telefoneInput && telefoneInput.value.trim() !== '' && !telefonePattern.test(telefoneInput.value)) {
            errosValidacao.push('Telefone (formato esperado: (XX) XXXX-XXXX)');
        }

        const cepPattern = /^\d{2}\.\d{3}-\d{3}$/;
        if (cepInput && cepInput.value.trim() !== '' && !cepPattern.test(cepInput.value)) {
            errosValidacao.push('CEP (formato esperado: XX.XXX-XXX)');
        }

        if (usuarioInput && usuarioInput.value.trim() !== '') {
            if (usuarioInput.value.trim().length < 5) {
                errosValidacao.push('Usuário (deve ter no mínimo 5 caracteres)');
            }
        }

       
        if (senhaInput && senhaInput.value.trim() !== '') {
            const senha = senhaInput.value;
            let temNumero = /\d/.test(senha);        
            let temLetra = /[a-zA-Z]/.test(senha);  
            let temSimbolo = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(senha); 
            let temMinOitoCaracteres = senha.length >= 8;

            if (!temNumero || !temLetra || !temSimbolo || !temMinOitoCaracteres) {
                let mensagemErroSenha = 'Senha (deve conter: ';
                if (!temNumero) mensagemErroSenha += 'números, ';
                if (!temLetra) mensagemErroSenha += 'letras, ';
                if (!temSimbolo) mensagemErroSenha += 'símbolos, ';
                if (!temMinOitoCaracteres) mensagemErroSenha += 'mais de 8 caracteres, ';
                mensagemErroSenha = mensagemErroSenha.slice(0, -2);
                mensagemErroSenha += ')';
                errosValidacao.push(mensagemErroSenha);
            }
        }


        let mensagensAlerta = [];
        if (camposVazios.length > 0) {
            mensagensAlerta.push(`Por favor, preencha os seguintes campos:\n- ${camposVazios.join('\n- ')}`);
        }
        if (errosValidacao.length > 0) {
            mensagensAlerta.push(`Os seguintes campos estão com formato inválido ou requisitos não atendidos:\n- ${errosValidacao.join('\n- ')}`);
        }

        if (mensagensAlerta.length > 0) {
            alert(mensagensAlerta.join('\n\n'));
        } else {
            alert('Formulário enviado com sucesso!');
            form.submit();
        }
    });
});