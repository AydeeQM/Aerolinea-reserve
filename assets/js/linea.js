"use strict";
class Reserve {
    constructor(numSeat, row) {
        this.numSeat = numSeat;
        this.row = row;
        this.passengers = [];
        this.currentCell = undefined;
    }

    init() {
        $('#open').click(() => {
            $('#overdiv').animate({ 'top': '-650px' }, 500, () => {
                $('#overdiv').fadeOut('fast');
            });
        });
    }

    drawSeat() {
        let col = this.numSeat / this.row;
        let passage = '';
        let table = '';
        table += `<table class="table table-bordered text-center">`;
        for (let i = 1; i <= this.row; i++) {
            table += `<tr>`;
            let group_seat = i;
            for (let j = 0; j < col; j++) {
                table += `<td>${group_seat}</td>`;
                group_seat += 6;
            }

            (i == 3) ? passage += `<td></td>` : passage = '';
            table += `</tr>${passage}`;
        }

        table += `</table>`;
        $('#tablero').append(table);
    }

    inboxUser() {
        $('table tr td').click((event) => {
            this.currentCell = $(event.target);

            if (this.currentCell.attr("bgcolor") != "#F8ED50") {
                this.currentCell.toggleClass("highlight");
            }

            $("#numseat").val(parseInt(event.target.textContent));
            $("#cancel").val(parseInt(event.target.textContent));

            let num = parseInt($('#numseat').val());
        });
    }

    showInput() {
        $('#addpass').click(() => {
            if (this.currentCell) {
                $('#overlay').fadeIn(200, () => {
                    $('#passenger').animate({ 'top': '20px' }, 200);
                });
            } else {
                alert('Seleccione asiento para reservar');
            }

            return false;
        });

        $('#boxclose').click(() => {
            $('#passenger').animate({ 'top': '-300px' }, 500, () => {
                $('#overlay').fadeOut('fast');
            });
        });
    }

    addUser() {
        $('#send').click(() => {
            $('.error').remove();
            if ($('#name').val() == "") {
                $('#name').focus().after("<span class='error'>Ingrese su nombre</span>");
                return false;
            } else if ($('#surname').val() == "") {
                $('#surname').focus().after("<span class='error'>Ingrese su apellido</span>");
                return false;
            } else if ($('#iddni').val() == "") {
                $('#iddni').focus().after("<span class='error'>Ingrese su DNI</span>");
                return false;
            } else {
                let data = {};
                let number_seat = $('#numseat').val();
                let suNombre = $('#name').val();
                let suApellido = $('#surname').val();
                let suDNI = parseInt($('#iddni').val());
                data.Item = number_seat;
                data.Nombre = suNombre;
                data.Apellido = suApellido;
                data.Dni = suDNI;
                this.passengers.push(data);
                alert(`El pasajero ${data.Nombre} ${data.Apellido} en el asiento N° ${data.Item} se ha agregado correctamente`);
                this.currentCell.css('background', '#F8ED50');

                $("#numseat").val('');
                $("#name").val('');
                $("#surname").val('');
                $("#iddni").val('');

                $('#passenger').animate({ 'top': '-300px' }, 500, () => {
                    $('#overlay').fadeOut('fast');
                });
            }
        });

        $('#name, #surname, #iddni').keyup(function(){
            if($(this).val() != ""){
                $('.error').fadeOut();
                return false;
            }
        });
    }

    searchList() {
        $('#search').click(() => {
            $('#overlay').fadeIn(200, () => {
                $('#search_id').animate({ 'top': '50px' }, 200);
            });
            return false;
        });

        $('#buscar').click(() => {
            let id_dni = parseInt($('#get_dni').val());
            $.grep(this.passengers, (value, index) => {
                if (id_dni == this.passengers[index].Dni) {
                    $('#target').empty();
                    $('#target').append(`Asiento N°: ${this.passengers[index].Item}<br>\
                                        Nombre: ${this.passengers[index].Nombre}<br>\
                                        Apellido: ${this.passengers[index].Apellido}<br>\
                                        DNI N°: ${this.passengers[index].Dni}<br><br>`)
                }
            });
        });

        $('#boxdelete').click(() => {
            $('#search_id').animate({ 'top': '-300px' }, 500, () => {
                $('#overlay').fadeOut('fast');
            });
        });
    }

    print_All() {
        $('#print').click(() => {
            $('.trx').remove();
            for (let i = 0; i < this.passengers.length; i++) {
                $("#records").append(`<div class='trx'>Asiento N°: ${this.passengers[i].Item}<br>\
                                Nombre: ${this.passengers[i].Nombre}<br>\
                                Apellido: ${this.passengers[i].Apellido}<br>\
                                DNI N°: ${this.passengers[i].Dni}<br><br></div>`);
            };
        });
    }

    cancelSeat() {
        $('#delete').click(() => {
            if (this.currentCell) {
                $('#overlay').fadeIn(200, () => {
                    $('#modal_free').animate({ 'top': '20px' }, 200);
                });
            } else {
                alert('Seleccione asiento para eliminar');
            }

            return false;
        });

        $('#check').click(() => {
            let e_num = $('#cancel').val();
            $.grep(this.passengers, (value, index) => {
                $('#list_delete').empty();
                if (e_num == this.passengers[index].Item) {
                    $('#list_delete').append(`Asiento N°: ${this.passengers[index].Item}<br>\
                                        Nombre: ${this.passengers[index].Nombre}<br>\
                                        Apellido: ${this.passengers[index].Apellido}<br>\
                                        DNI N°: ${this.passengers[index].Dni}<br><br>`)
                }
            });
        })

        $('#cross_out').click(() => {
            let number_seat = $('#cancel').val();
            //let num = parseInt($('#cancel').val());
            $.grep(this.passengers, (value, index) => {
                let ss = this.passengers[index].Item
                let itemtoRemove = this.passengers[index];
                if (number_seat === ss) {
                    this.passengers.splice($.inArray(itemtoRemove, this.passengers), 1);
                }
            });

            this.currentCell.css('background', 'transparent');

            $('#modal_free').animate({ 'top': '-300px' }, 500, () => {
                $('#overlay').fadeOut('fast');
            });
        });
        $('#dopping').click(() => {
            $('#modal_free').animate({ 'top': '-300px' }, 500, () => {
                $('#overlay').fadeOut('fast');
            });
        });
    }

}

let aeroline_reserve = new Reserve(30, 6);
console.log(aeroline_reserve.passengers);
aeroline_reserve.init();
aeroline_reserve.drawSeat();
aeroline_reserve.showInput();
aeroline_reserve.inboxUser();
aeroline_reserve.addUser();
aeroline_reserve.searchList();
aeroline_reserve.print_All();
aeroline_reserve.cancelSeat();