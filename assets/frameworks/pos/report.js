 $(document).ready(function() { 

     $('#newsalesperson').on('change', function() {
        alert('aaa');
             var salespersonID = $(this).val();
             if (salespersonID != "0") {
    
                 $.ajax({
                    
                     url: "<?php echo base_url(); ?>" + "/admin/customer/findemploeeroute",
                     method: 'POST',
                     data: { salespersonID: salespersonID },
                     dataType: 'json',
                     success: function(response) {
    
                         $('#route').empty();
                         $('#route').append('<option value="0">-Select-</option>');   url: "../Admin/Controller/Product.php",
    
                         $.each(response, function(index, routeID) {
                         console.log(routeID);
                         $('#route').append('<option value="'+ routeID.route_id +'">'+ routeID.route_name +'</option>');
                     });
                     },
                     error: function(xhr, status, error) {
                         console.error('Error fetching routes:', error);
                     }
                 });
             } else {
                 $('#route').empty();
                 $('#route').append('<option value="0">-Select-</option>');
             }
         });
     
 })
 
 
 $('#route').on('change', function() {
    alert('aaa');
        var routeID = $(this).val();
        var newsalesperson = $('#newsalesperson').val();
        
        $.ajax({
            url: baseUrl + '/job/loadcustomersroutewise',
            type: 'POST',
            dataType: "json",
            data: {
                routeID: routeID,
                newsalesperson:newsalesperson
            },
            success: function(data) {
                console.log("Customer Data:", data);
                $("#customer").html('<option value="">Select Customer</option>');

               
                if (data.length > 0) {
                    $.each(data, function(index, customer) {
                        $("#customer").append(
                            `<option value="${customer.CusCode}">${customer.DisplayName}</option>`
                        );
                    });
                }

                $('#customer').select2({
                    placeholder: "Select a customer",
                    allowClear: true,
                    width: '100%'
                });
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error:", error); // Log any AJAX errors
            }
        });
    });