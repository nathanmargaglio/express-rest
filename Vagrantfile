# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # base box
  config.vm.box = "ubuntu/xenial64"
  config.vm.box_version = "20180921.0.0"

  # provisioning script
  config.vm.provision :shell, :path => "bootstrap.sh"

  # ssh forwarding
  config.ssh.forward_agent = true

  # port forwarding
  config.vm.network :forwarded_port, guest: 80, host: 8080
  config.vm.network :forwarded_port, guest: 443, host: 8443
  config.vm.network :forwarded_port, guest: 5432, host: 15432

  # allocate system CPUs and RAM
  config.vm.provider :virtualbox do |vb|
    host = RbConfig::CONFIG['host_os']

    # give VM access to all cpu cores on host
    if host =~ /darwin/
      cpus = `sysctl -n hw.ncpu`.to_i
    elsif host =~ /linux/
      cpus = `nproc`.to_i
    else
      cpus = 2
    end

    mem = 2048
    vb.customize ["modifyvm", :id, "--memory", mem]
    vb.customize ["modifyvm", :id, "--cpus", cpus]
    vb.name = "express-rest"
  end

  # restart services on up
  config.trigger.after [:up], :stdout => true do
    system('vagrant ssh -c "sudo service apache2 restart && sudo service postgresql restart"')
  end

end
